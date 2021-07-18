import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'

import { generatorApiFeatureAccount } from './generator-api-feature-account'
import { generatorApiFeatureAuth } from './generator-api-feature-auth'
import { generatorApiFeatureCore } from './generator-api-feature-core'
import { generatorApiFeatureUser } from './generator-api-feature-user'

export async function generatorApiFeature(host: Tree, options: ApiFeatureGeneratorSchema) {
  switch (options.type) {
    case 'account':
      return generatorApiFeatureAccount(host, options)
    case 'auth':
      return generatorApiFeatureAuth(host, options)
    case 'core':
      return generatorApiFeatureCore(host, options)
    case 'user':
      return generatorApiFeatureUser(host, options)
  }
}
