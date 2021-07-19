import { Tree } from '@nrwl/devkit'
import { WebFeatureGeneratorSchema } from './schema'
import { createWebFeature } from './create-web-feature'

export async function generateWebFeatureAuth(host: Tree, options: WebFeatureGeneratorSchema) {
  await createWebFeature(host, 'data-access', options)
  await createWebFeature(host, 'feature', options)
  await createWebFeature(host, 'ui', options)
}
