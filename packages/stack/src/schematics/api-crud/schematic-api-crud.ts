import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'

import { addFiles, createProjectName, normalizeOptions } from '../../utils'
import { ApiCrudSchematicSchema } from './schema'
import { strings } from '@angular-devkit/core'

function apiCrudDataAccess(type: 'data-access' | 'feature', options: ApiCrudSchematicSchema): Rule {
  const directory = options.directory || 'api'
  const name = createProjectName(options.name, type)
  const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
    { ...options, directory, name },
    ProjectType.Library,
  )
  const modelName = options.model || options.name
  const pluralModelName = options.plural || modelName + 's'
  const nameField = options.nameField || 'name'
  const templateOptions = {
    ...normalizedOptions,
    modelName,
    pluralModelName,
    nameField,
  }

  return chain([
    externalSchematic('@nrwl/nest', 'library', {
      name,
      directory,
      tags: `scope:${directory},type:${type}`,
    }),
    addFiles(templateOptions, `./files/${type}`),
  ])
}

function updatePrisma(options: ApiCrudSchematicSchema): Rule {
  return function (host: Tree, ctx: SchematicContext) {
    const prismaPath = JSON.parse(host.read('package.json')?.toString())?.prisma?.schema
    if (!prismaPath) {
      ctx.logger.fatal(`Can't find prisma.schema in package.json`)
    }
    ctx.logger.info(`Found prisma.schema in ${prismaPath}`)

    const schema = host.read(prismaPath)?.toString()
    const modelName = options.model || options.name
    const nameField = options.nameField || 'name'
    const modelIdentifier = `model ${strings.classify(modelName)}`

    if (schema && !schema.includes(modelIdentifier)) {
      const model = [
        `${modelIdentifier} {`,
        `  id        String   @id @default(cuid())`,
        `  createdAt DateTime @default(now())`,
        `  updatedAt DateTime @updatedAt`,
        `  ${nameField} String`,
        '}',
      ].join('\n')
      host.overwrite(prismaPath, [schema, model, ''].join('\n\n'))
      ctx.logger.info(`Add ${modelIdentifier} to ${prismaPath}`)
    }

    return host
  }
}

function addImport(options: ApiCrudSchematicSchema): Rule {
  return function (host: Tree, ctx: SchematicContext) {
    const normalizedOptions = normalizeOptions<ApiCrudSchematicSchema>(
      { ...options, directory: options.directory || 'api', name: options.name },
      ProjectType.Library,
    )
    const coreFeaturePath = `libs/${normalizedOptions.apiAppName}/core/feature/src/lib/${normalizedOptions.apiAppName}-core-feature.module.ts`

    if (!host.exists(coreFeaturePath)) {
      ctx.logger.fatal(`Can't find ${coreFeaturePath}`)
    }

    ctx.logger.info(`Found ${coreFeaturePath}`)
    const contents = host.read(coreFeaturePath)?.toString()

    if (contents) {
      const app = strings.classify(normalizedOptions.apiAppName)
      const name = strings.classify(normalizedOptions.name)

      const searchImport = `import { ${app}UserFeatureModule } from '@${normalizedOptions.npmScope}/${normalizedOptions.apiAppName}/user/feature'`
      const featureImport = `import { ${app}${name}FeatureModule } from '@${normalizedOptions.npmScope}/${normalizedOptions.apiAppName}/${normalizedOptions.name}/feature';`
      const searchModule = `${app}UserFeatureModule,`
      const featureModule = `    ${app}${name}FeatureModule,`

      const replacedModule = contents
        .replace(searchImport, [searchImport, featureImport].join('\n'))
        .replace(searchModule, [searchModule, featureModule].join('\n'))

      host.overwrite(coreFeaturePath, replacedModule)
    }

    return host
  }
}

export default function (options: ApiCrudSchematicSchema): Rule {
  return chain([
    apiCrudDataAccess('data-access', options),
    apiCrudDataAccess('feature', options),
    //
    updatePrisma(options),
    addImport(options),
    (_, ctx) => {
      ctx.logger.warn(`Run 'yarn prisma:apply' and restart the API`)
    },
  ])
}
