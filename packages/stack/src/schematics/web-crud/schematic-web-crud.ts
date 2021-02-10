import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'

import { addFiles, createProjectName, getPluginConfig, normalizeOptions } from '../../utils'
import { ApiCrudSchematicSchema } from './schema'
import { strings } from '@angular-devkit/core'

function webCrudLibrary(type: 'ui' | 'feature', options: ApiCrudSchematicSchema): Rule {
  const name = createProjectName(options.name, type)
  const { webAppName } = getPluginConfig(options)
  const directory = options.directory || webAppName
  const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
    { ...options, directory, name },
    ProjectType.Library,
  )
  const modelName = options.model || options.name
  const pluralModelName = options.plural || modelName + 's'
  const nameField = options.nameField || 'name'
  const templateOptions = {
    ...normalizedOptions,
    directory,
    modelName,
    pluralModelName,
    nameField,
    type,
  }

  return chain([
    externalSchematic('@nrwl/angular', 'library', {
      name,
      directory,
      tags: `scope:${directory},type:${type}`,
      style: 'css',
      prefix: options.name,
      linter: 'eslint',
      skipInstal: true,
    }),
    addFiles(templateOptions, `./files/${type}`),
  ])
}

function updateGraphQLSDK(options: ApiCrudSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
    { ...options, directory: options.directory, name: options.name },
    ProjectType.Library,
  )

  const modelName = options.model || options.name
  const pluralModelName = options.plural || modelName + 's'
  const nameField = options.nameField || 'name'
  const projectRoot = `libs/${normalizedOptions.webAppName}/util/sdk`

  const params: any = {
    ...normalizedOptions,
    modelName,
    pluralModelName,
    nameField,
    projectRoot,
  }
  return chain([addFiles(params, './files/sdk')])
}

function addAdminRoutes(options: ApiCrudSchematicSchema): Rule {
  return function (host: Tree, ctx: SchematicContext) {
    const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
      { ...options, directory: options.directory || 'web', name: options.name },
      ProjectType.Library,
    )

    const modelName = options.model || options.name
    const pluralModelName = options?.plural || modelName + 's'
    const modulePath = `admin-${strings.dasherize(modelName)}`

    const adminComponent = `libs/${normalizedOptions.webAppName}/admin/feature/src/lib/${normalizedOptions.webAppName}-admin-feature.component.ts`
    ctx.logger.info(`Updating ${adminComponent}`)
    searchAppend(
      host,
      adminComponent,
      `{ label: 'Dashboard', path: 'dashboard', icon: '' },`,
      `{ label: '${strings.classify(pluralModelName)}', path: '${strings.dasherize(modelName)}', icon: '' },`,
    )

    const adminModule = `libs/${normalizedOptions.webAppName}/admin/feature/src/lib/${normalizedOptions.webAppName}-admin-feature.module.ts`
    ctx.logger.info(`Updating ${adminModule}`)
    searchAppend(
      host,
      adminModule,
      `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },`,
      `{ path: '${strings.dasherize(
        modelName,
      )}', loadChildren: () => import('./${modulePath}/${modulePath}.module').then((m) => m.Admin${strings.classify(
        modelName,
      )}Module) },`,
    )

    const params: any = {
      ...normalizedOptions,
      modelName,
      projectRoot: `libs/${normalizedOptions.webAppName}/admin/feature`,
    }

    return addFiles(params, './files/admin/feature')
  }
}

function addShellRoutes(options: ApiCrudSchematicSchema): Rule {
  return function (host: Tree, ctx: SchematicContext) {
    const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
      { ...options, directory: options.directory || 'web', name: options.name },
      ProjectType.Library,
    )

    const modelName = options.model || options.name
    const pluralModelName = options?.plural || modelName + 's'
    const modulePath = [
      `@${normalizedOptions?.npmScope}`,
      strings.dasherize(normalizedOptions?.webAppName),
      strings.dasherize(modelName),
      'feature',
    ].join('/')

    searchAppend(
      host,
      `libs/${normalizedOptions.webAppName}/shell/feature/src/lib/${normalizedOptions.webAppName}-shell-feature.module.ts`,
      `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },`,
      `{
        path: '${strings.dasherize(pluralModelName)}',
        loadChildren: () =>
          import('${modulePath}').then((m) => m.${strings.classify(normalizedOptions.webAppName)}${strings.classify(
        modelName,
      )}FeatureModule)
        },`,
    )

    searchAppend(
      host,
      `libs/${normalizedOptions.webAppName}/layout/src/lib/${normalizedOptions.webAppName}-layout.store.ts`,
      `{ label: 'Dashboard', route: '/dashboard' },`,
      `{ label: '${strings.capitalize(pluralModelName)}', route: '${strings.dasherize(pluralModelName)}' },`,
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
