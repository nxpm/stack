import { addProjectConfiguration, formatFiles, names, Tree } from '@nrwl/devkit'
import { libraryGenerator } from '@nrwl/nest'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { ApiCrudGeneratorSchema } from './schema'

function updatePrisma(host: Tree, options: ApiCrudGeneratorSchema) {
  const prismaPath = JSON.parse(host.read('package.json')?.toString())?.prisma?.schema
  if (!prismaPath) {
    throw new Error(`Can't find prisma.schema in package.json`)
  }
  console.log(`Found prisma.schema in ${prismaPath}`)

  const schema = host.read(prismaPath)?.toString()
  const modelName = options.model || options.name
  const nameField = options.nameField || 'name'
  const modelIdentifier = `model ${names(modelName).className}`

  if (schema && !schema.includes(modelIdentifier)) {
    const model = [
      `${modelIdentifier} {`,
      `  id        String   @id @default(cuid())`,
      `  createdAt DateTime @default(now())`,
      `  updatedAt DateTime @updatedAt`,
      `  ${nameField} String`,
      '}',
    ].join('\n')
    host.write(prismaPath, [schema, model, ''].join('\n\n'))
    console.log(`Add ${modelIdentifier} to ${prismaPath}`)
  }
}

function addImport(host: Tree, options: ApiCrudGeneratorSchema) {
  const normalizedOptions = normalizeOptions<ApiCrudGeneratorSchema>(
    host,
    { ...options, directory: options.directory || 'api', name: options.name },
    'library',
  )
  const coreFeaturePath = `libs/${normalizedOptions.appNameApi}/core/feature/src/lib/${normalizedOptions.appNameApi}-core-feature.module.ts`

  if (!host.exists(coreFeaturePath)) {
    console.log(`Can't find ${coreFeaturePath}`)
  }

  console.log(`Found ${coreFeaturePath}`)
  const contents = host.read(coreFeaturePath)?.toString()

  if (contents) {
    const app = names(normalizedOptions.appNameApi).className
    const name = names(normalizedOptions.name).className

    const searchImport = `import { ${app}UserFeatureModule } from '@${normalizedOptions.npmScope}/${normalizedOptions.appNameApi}/user/feature'`
    const featureImport = `import { ${app}${name}FeatureModule } from '@${normalizedOptions.npmScope}/${normalizedOptions.appNameApi}/${normalizedOptions.name}/feature';`
    const searchModule = `${app}UserFeatureModule,`
    const featureModule = `    ${app}${name}FeatureModule,`

    const replacedModule = contents
      .replace(searchImport, [searchImport, featureImport].join('\n'))
      .replace(searchModule, [searchModule, featureModule].join('\n'))

    host.write(coreFeaturePath, replacedModule)
  }
}

async function apiCrudLib(host: Tree, type: 'data-access' | 'feature', options: ApiCrudGeneratorSchema) {
  const directory = options.directory || 'api'
  const name = `${options.name}/${type}`
  const normalizedOptions = normalizeOptions<ApiCrudGeneratorSchema>(host, { ...options, directory, name }, 'library')
  const model = options.model || options.name
  const plural = options.plural || model + 's'
  const nameField = options.nameField || 'name'

  const templateOptions = {
    ...normalizedOptions,
    model: names(model),
    plural: names(plural),
    nameField,
  }
  await libraryGenerator(host, {
    ...normalizedOptions,
    directory,
    tags: `scope:${directory},type:${type}`,
  })
  addFiles(host, templateOptions, join(__dirname, `files`, type))
}

export async function generatorApiCrud(host: Tree, options: ApiCrudGeneratorSchema) {
  await apiCrudLib(host, 'data-access', options)
  await apiCrudLib(host, 'feature', options)
  await updatePrisma(host, options)
  await addImport(host, options)
  await formatFiles(host)
}
