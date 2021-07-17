import { formatFiles, Tree } from '@nrwl/devkit'
import { NormalizedSchema, normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { ApiFeatureGeneratorSchema, ApiFeatureType } from './schema'
import { createApiLib } from '../../helpers'

async function generateFeature(host: Tree, type: ApiFeatureType, options: NormalizedSchema) {
  const directory = options.directory || options.appNameApi
  const files = join(__dirname, 'files', type)

  switch (type) {
    case 'account':
      await createApiLib(host, directory, `${type}/data-access`, files, 'data-access', options, [], {}, {})
      await createApiLib(host, directory, `${type}/feature`, files, 'feature', options, [], {}, {})
      break
    case 'auth':
      await createApiLib(host, directory, `${type}/data-access`, files, 'data-access', options, [], {}, {})
      await createApiLib(host, directory, `${type}/feature`, files, 'feature', options, [], {}, {})
      await createApiLib(host, directory, `${type}/util`, files, 'util', options, [], {}, {})
      break
    case 'core':
      await createApiLib(host, directory, `${type}/data-access`, files, 'data-access', options, [], {}, {})
      await createApiLib(host, directory, `${type}/feature`, files, 'feature', options, [], {}, {})
      break
    case 'user':
      await createApiLib(host, directory, `${type}/data-access`, files, 'data-access', options, [], {}, {})
      await createApiLib(host, directory, `${type}/feature`, files, 'feature', options, [], {}, {})
      break
  }
}

export async function generatorApiFeature(host: Tree, options: ApiFeatureGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')

  await generateFeature(host, options.type, normalizedOptions)

  await formatFiles(host)
}
