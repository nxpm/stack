import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'
import { createApiFeature } from './create-api-feature'

export async function generatorApiFeatureUser(host: Tree, options: ApiFeatureGeneratorSchema) {
  await createApiFeature(host, 'data-access', options)
  await createApiFeature(host, 'feature', options)
}
