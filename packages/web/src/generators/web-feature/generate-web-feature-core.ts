import { Tree } from '@nrwl/devkit'
import { logEntry } from '@nxpm/common'
import { createWebFeature } from './create-web-feature'
import { WebFeatureGeneratorSchema } from './schema'

export async function generateWebFeatureCore(host: Tree, options: WebFeatureGeneratorSchema) {
  const startTime = new Date()
  logEntry(`    -> web feature core data-access`, startTime)
  await createWebFeature(host, 'data-access', options)
  logEntry(`    -> web feature core feature`, startTime)
  await createWebFeature(host, 'feature', options)
}
