import { chain, externalSchematic, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, getProjectConfig, ProjectType, updateWorkspaceInTree } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions, removeFiles } from '../../utils'
import { AdminSchematicSchema } from './schema'

function updateEnvironment(name: string): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, name)
    if (projectConfig.architect && projectConfig.architect?.build?.configurations?.production?.fileReplacements) {
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect.build.configurations.production.fileReplacements = [
            {
              replace: `libs/${name}/feature-core/src/environments/environment.ts`,
              with: `libs/${name}/feature-core/src/environments/environment.prod.ts`,
            },
          ]
          json.projects[name] = projectConfig
          return json
        }),
      ])(host, context)
    }
  }
}

function addAllowedCommonJsDependencies(name: string, allowedCommonJsDependencies: string[]): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, name)
    if (projectConfig.architect && projectConfig.architect?.build?.options) {
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect.build.options.allowedCommonJsDependencies = allowedCommonJsDependencies
          json.projects[name] = projectConfig
          return json
        }),
      ])(host, context)
    }
  }
}

function proxyConfigTemplate(): string {
  return [
    `const dotenv = require('dotenv')`,
    `dotenv.config()`,
    ``,
    `const PORT = process.env.PORT || 3000`,
    `const HOST = process.env.HOST || 'localhost'`,
    'const target = `http://${HOST}:${PORT}`',
    `module.exports = {`,
    `  '/api': { target, secure: false },`,
    `  '/graphql': { target, secure: false, ws: true },`,
    `}`,
  ].join('\n')
}

function addProxyConfig(name: string): Rule {
  const contents = proxyConfigTemplate()

  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, name)
    if (projectConfig.architect && projectConfig.architect.serve) {
      const proxyConfig = `${projectConfig.root}/proxy.conf.js`
      host.create(proxyConfig, contents)
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect.serve.options.proxyConfig = proxyConfig
          json.projects[name] = projectConfig
          return json
        }),
      ])(host, context)
    }
  }
}

export default function (options: AdminSchematicSchema): Rule {
  const name = options.name || 'admin'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions<AdminSchematicSchema>(options, ProjectType.Application)

  return chain([
    addDepsToPackageJson(
      {
        '@apollo/client': '^3.2.1',
        'apollo-angular': '^2.0.4',
      },
      {
        '@graphql-codegen/cli': '1.17.8',
        '@graphql-codegen/introspection': '1.17.8',
        '@graphql-codegen/typescript': '1.17.8',
        '@graphql-codegen/typescript-apollo-angular': '^2.0.1',
        '@graphql-codegen/typescript-operations': '1.17.8',
      },
      true,
    ),
    externalSchematic('@nrwl/angular', 'application', {
      name,
      style: 'scss',
      routing: true,
    }),
    schematic('admin-assets', {
      appName: name,
      directory,
      name: 'assets',
    }),
    schematic('admin-data-access', {
      directory,
      name: 'data-access',
    }),
    schematic('admin-feature-about', {
      appName: name,
      directory,
      name: 'about',
    }),
    schematic('admin-feature-core', {
      directory,
      name: 'core',
    }),
    schematic('admin-feature-dashboard', {
      appName: name,
      directory,
      name: 'dashboard',
    }),
    schematic('admin-feature-shell', {
      appName: name,
      directory,
      name: 'shell',
    }),
    schematic('admin-layout', {
      appName: name,
      directory,
      name: 'layout',
    }),
    schematic('admin-style', {
      appName: name,
      directory,
      name: 'style',
    }),
    schematic('admin-lib', { directory, name: 'auth', type: 'feature' }),
    addRunScript(`dev:${name}`, `nx serve ${name}`),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addFiles(normalizedOptions),
    removeFiles(
      [
        `app/app.component.css`,
        `app/app.component.scss`,
        `app/app.component.html`,
        `app/app.component.spec.ts`,
        `environments/environment.ts`,
        `environments/environment.prod.ts`,
        `environments`,
        `assets/.gitkeep`,
        `assets/`,
        `favicon.ico`,
      ],
      `${normalizedOptions.projectRoot}/src/`,
    ),
    updateEnvironment(normalizedOptions.name),
    addProxyConfig(normalizedOptions.name),
    addAllowedCommonJsDependencies(normalizedOptions.name, [
      'graphql-tag',
      'subscriptions-transport-ws',
      'zen-observable',
    ]),
  ])
}
