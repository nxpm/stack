import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'

import { generateApiFeatureAccount } from './generate-api-feature-account'
import { generateApiFeatureAuth } from './generate-api-feature-auth'
import { generateApiFeatureCore } from './generate-api-feature-core'
import { generateApiFeatureUser } from './generate-api-feature-user'

export async function generatorApiFeature(host: Tree, options: ApiFeatureGeneratorSchema) {
  switch (options.type) {
    case 'account':
      return generateApiFeatureAccount(host, options)
    case 'auth':
      return generateApiFeatureAuth(host, options)
    case 'core':
      return generateApiFeatureCore(host, options)
    case 'user':
      return generateApiFeatureUser(host, options)
  }
}
