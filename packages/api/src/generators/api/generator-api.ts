import { formatFiles, Tree } from '@nrwl/devkit'
import { applicationGenerator as nestApplicationGenerator } from '@nrwl/nest'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { generatorApiE2e } from '../api-e2e/generator-api-e2e'
import { ApiGeneratorSchema } from './schema'
import { generatorApiFeature } from '../api-feature/generator-api-feature'

export async function generatorApi(host: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  const name = normalizedOptions.name
  await nestApplicationGenerator(host, {
    ...normalizedOptions,
    name,
  })
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  // api e2e
  await generatorApiE2e(host, {
    ...normalizedOptions,
    name: `${name}-e2e`,
  })

  // api feature account
  await generatorApiFeature(host, { name: 'account', type: 'account', directory: name })

  // api feature auth
  await generatorApiFeature(host, { name: 'auth', type: 'auth', directory: name })

  // api feature core
  await generatorApiFeature(host, { name: 'core', type: 'core', directory: name })

  // api feature user
  await generatorApiFeature(host, { name: 'user', type: 'user', directory: name })

  await formatFiles(host)
}
