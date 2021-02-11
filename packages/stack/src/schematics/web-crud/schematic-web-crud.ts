import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'

import { addFiles, createProjectName, getPluginConfig, normalizeOptions } from '../../utils'
import { ApiCrudSchematicSchema } from './schema'
import { strings } from '@angular-devkit/core'

function getTemplateOptions(options: ApiCrudSchematicSchema) {
  const { webAppName } = getPluginConfig(options)
  const modelName = options.model || options.name
  const pluralModelName = options?.plural || modelName + 's'
  const directory = options.directory || webAppName
  const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
    { ...options, directory, name: options.name },
    ProjectType.Library,
  )

  const nameField = options.nameField || 'name'
  return {
    ...normalizedOptions,
    directory,
    modelName,
    pluralModelName,
    nameField,
  }
}

function webCrudLibrary(type: 'ui' | 'feature', options: ApiCrudSchematicSchema): Rule {
  const name = createProjectName(options.name, type)
  const templateOptions = getTemplateOptions(options)
  return chain([
    externalSchematic('@nrwl/angular', 'library', {
      name,
      directory: templateOptions.directory,
      tags: `scope:${templateOptions.directory},type:${type}`,
      style: 'css',
      prefix: options.name,
      linter: 'eslint',
      skipInstal: true,
    }),
    addFiles({ ...templateOptions, type } as any, `./files/${type}`),
  ])
}

function updateGraphQLSDK(options: ApiCrudSchematicSchema): Rule {
  const templateOptions = getTemplateOptions(options)
  const projectRoot = `libs/${templateOptions.webAppName}/util/sdk`

  const params: any = {
    ...templateOptions,
    projectRoot,
  }
  return chain([addFiles(params, './files/sdk')])
}

function addAdminRoutes(options: ApiCrudSchematicSchema): Rule {
  const templateOptions = getTemplateOptions(options)
  return function (host: Tree, ctx: SchematicContext) {
    const modulePath = `admin-${strings.dasherize(templateOptions.modelName)}`
    const adminComponent = `libs/${templateOptions.webAppName}/admin/feature/src/lib/${templateOptions.webAppName}-admin-feature.component.ts`
    ctx.logger.info(`Updating ${adminComponent}`)
    searchAppend(
      host,
      adminComponent,
      `{ label: 'Dashboard', path: 'dashboard', icon: '' },`,
      `{ label: '${strings.classify(templateOptions.pluralModelName)}', path: '${strings.dasherize(
        templateOptions.modelName,
      )}', icon: '' },`,
    )

    const adminModule = `libs/${templateOptions.webAppName}/admin/feature/src/lib/${templateOptions.webAppName}-admin-feature.module.ts`
    ctx.logger.info(`Updating ${adminModule}`)
    searchAppend(
      host,
      adminModule,
      `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },`,
      `{ path: '${strings.dasherize(templateOptions.modelName)}',
                  loadChildren: () => import('./${modulePath}/${modulePath}.module')
                    .then((m) => m.Admin${strings.classify(templateOptions.modelName)}Module) },
        `,
    )

    const params: any = {
      ...templateOptions,
      projectRoot: `libs/${templateOptions.webAppName}/admin/feature`,
    }

    return addFiles(params, './files/admin/feature')
  }
}

function addShellRoutes(options: ApiCrudSchematicSchema): Rule {
  const templateOptions = getTemplateOptions(options)
  return function (host: Tree) {
    const modulePath = [
      `@${templateOptions?.npmScope}`,
      strings.dasherize(templateOptions?.webAppName),
      strings.dasherize(templateOptions.modelName),
      'feature',
    ].join('/')
    searchAppend(
      host,
      `libs/${templateOptions.webAppName}/shell/feature/src/lib/${templateOptions.webAppName}-shell-feature.module.ts`,
      `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },`,
      `{
        path: '${strings.dasherize(templateOptions.pluralModelName)}',
        loadChildren: () =>
          import('${modulePath}').then((m) => m.${strings.classify(templateOptions.webAppName)}${strings.classify(
        templateOptions.modelName,
      )}FeatureModule)
        },`,
    )
    searchAppend(
      host,
      `libs/${templateOptions.webAppName}/layout/src/lib/${templateOptions.webAppName}-layout.store.ts`,
      `{ label: 'Dashboard', route: '/dashboard' },`,
      `{ label: '${strings.capitalize(templateOptions.pluralModelName)}', route: '${strings.dasherize(
        templateOptions.pluralModelName,
      )}' },`,
    )
    return host
  }
}

export function searchAppend(host: Tree, path: string, search: string, append: string) {
  const contents = host.read(path)?.toString()

  if (contents) {
    host.overwrite(path, contents.replace(search, [search, append].join('\n')))
  }
}

export default function (options: ApiCrudSchematicSchema): Rule {
  return chain([
    webCrudLibrary('feature', options),
    webCrudLibrary('ui', options),
    updateGraphQLSDK(options),
    addAdminRoutes(options),
    addShellRoutes(options),
    (_, ctx) => {
      ctx.logger.warn(`Regenerate the SDK`)
    },
  ])
}
