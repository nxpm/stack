import { formatFiles, Tree } from '@nrwl/devkit'
import { applicationGenerator as nestApplicationGenerator } from '@nrwl/nest'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { generatorApiE2e } from '../api-e2e/generator-api-e2e'
import { ApiGeneratorSchema } from './schema'

export async function generatorApi(host: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  await nestApplicationGenerator(host, {
    ...normalizedOptions,
    name: normalizedOptions.name,
  })
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  // api e2e
  await generatorApiE2e(host, {
    ...normalizedOptions,
    name: `${normalizedOptions.name}-e2e`,
  })

  // api feature account
  // api feature auth
  // api feature core
  // api feature user

  await formatFiles(host)
}
