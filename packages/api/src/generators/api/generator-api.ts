import { Tree } from '@nrwl/devkit'
import { applicationGenerator } from '@nrwl/nest'
import { normalizeOptions } from '@nxpm/common'
import { ApiGeneratorSchema } from './schema'

export async function generatorApi(host: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions<ApiGeneratorSchema>(host, options)

  await applicationGenerator(host, {
    ...normalizedOptions,
    name: normalizedOptions.name,
  })
  console.log('generateApp RAN RAN')
  // await formatFiles(host)
}
