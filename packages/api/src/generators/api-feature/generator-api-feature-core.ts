import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'
import { versions } from '@nxpm/common'
import { createApiFeature } from './create-api-feature'
import { addPrismaConfig } from '../../helpers'

export async function generatorApiFeatureCore(host: Tree, options: ApiFeatureGeneratorSchema) {
  await createApiFeature(host, 'data-access', {
    ...options,
    lib: {
      deps: {
        '@kikstart-playground/graphql-intercom': versions.kikstartPlaygroundGraphqlIntercom,
        '@nestjs/config': versions.nestjsConfig,
        '@nestjs/graphql': versions.nestjsGraphql,
        '@nestjs/serve-static': versions.nestjsServeStatic,
        'cookie-parser': versions.cookieParser,
        'fs-extra': versions.fsExtra,
        'graphql-subscriptions': versions.graphqlSubscriptions,
        'apollo-server-express': versions.apolloServerExpress,
        'class-transformer': versions.classTransformer,
        'class-validator': versions.classValidator,
        joi: versions.joi,
        graphql: versions.graphql,
        'graphql-type-json': versions.graphqlTypeJson,
        'graphql-tools': versions.graphqlTools,
      },
      devDeps: {
        '@types/fs-extra': versions.typesFsExtra,
      },
    },
  })
  await createApiFeature(host, 'feature', {
    ...options,
    lib: {
      deps: {
        '@prisma/client': versions.prisma,
      },
      devDeps: {
        prisma: versions.prisma,
      },
    },
  })
  await addPrismaConfig(host, `${options.directory}-core-data-access`)
  await createApiFeature(host, 'util', options)
}
