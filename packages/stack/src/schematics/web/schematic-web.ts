import { chain, externalSchematic, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, getProjectConfig, ProjectType, updateWorkspaceInTree } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions, removeFiles } from '../../utils'
import { WebSchematicSchema } from './schema'

function updateEnvironment(name: string): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, name)
    if (projectConfig.architect && projectConfig.architect?.build?.configurations?.production?.fileReplacements) {
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect.build.configurations.production.fileReplacements = [
            {
              replace: `libs/${name}/core/feature/src/environments/environment.ts`,
              with: `libs/${name}/core/feature/src/environments/environment.prod.ts`,
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

export default function (options: WebSchematicSchema): Rule {
  const name = options.name || 'web'
  const directory = options.directory || options.name
  const styleLibrary = options.styleLibrary || 'tailwind'
  const style = styleLibrary === 'bootstrap' ? 'scss' : 'css'
  const normalizedOptions = normalizeOptions<WebSchematicSchema>(options, ProjectType.Application)

  return chain([
    addDepsToPackageJson(
      {
        '@apollo/client': '^3.2.9',
        'apollo-angular': '^2.1.0',
        '@ngrx/component-store': '10.1.2',
      },
      {
        '@graphql-codegen/cli': '1.19.3',
        '@graphql-codegen/introspection': '1.18.1',
        '@graphql-codegen/typescript': '1.18.1',
        '@graphql-codegen/typescript-apollo-angular': '^2.2.1',
        '@graphql-codegen/typescript-operations': '1.17.12',
        '@ngneat/spectator': '6.1.3',
      },
      true,
    ),
    externalSchematic('@nrwl/angular', 'application', {
      name,
      style,
      routing: true,
      linter: 'eslint',
    }),
    schematic('web-feature-about', { appName: name, directory }),
    schematic('web-feature-account', { appName: name, directory }),
    schematic('web-feature-admin', { appName: name, directory }),
    schematic('web-assets', {
      appName: name,
      directory,
      name: 'assets',
    }),
    schematic('web-feature-auth', { appName: name, directory }),
    schematic('web-feature-core', { appName: name, directory }),
    schematic('web-dashboard-feature', {
      appName: name,
      directory,
      name: 'dashboard',
    }),
    schematic('web-layout', {
      appName: name,
      directory,
      name: 'layout',
      library: styleLibrary,
    }),
    schematic('web-shell-feature', {
      appName: name,
      directory,
      name: 'shell',
    }),
    schematic('web-style', {
      appName: name,
      directory,
      name: 'style',
      library: styleLibrary,
    }),
    schematic('web-ui-libs', {
      appName: name,
      directory,
      library: styleLibrary,
    }),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addRunScript(`dev:${name}`, `nx serve ${name} --hmr`),
    addFiles(normalizedOptions),
    removeFiles(
      [
        `app/app.component.css`,
        `app/app.component.${style}`,
        `app/app.component.html`,
        `app/app.component.spec.ts`,
        `environments/environment.ts`,
        `environments/environment.prod.ts`,
        `environments`,
        `assets/.gitkeep`,
        `assets/`,
        `favicon.ico`,
        `styles.${style}`,
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
