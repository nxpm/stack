import { Tree } from '@nrwl/devkit'
import { MobileFeatureGeneratorSchema } from './schema'
import { createMobileFeature } from './create-mobile-feature'

export async function generateMobileFeatureCore(host: Tree, options: MobileFeatureGeneratorSchema) {
  await createMobileFeature(host, 'data-access', options)
  await createMobileFeature(host, 'feature', options)
}
