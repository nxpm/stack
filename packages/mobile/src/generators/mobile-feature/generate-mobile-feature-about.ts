import { Tree } from '@nrwl/devkit'
import { MobileFeatureGeneratorSchema } from './schema'
import { createMobileFeature } from './create-mobile-feature'

export async function generateMobileFeatureAbout(host: Tree, options: MobileFeatureGeneratorSchema) {
  await createMobileFeature(host, 'feature', options)
}
