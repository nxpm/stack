import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'
import { versions } from '@nxpm/common'
import { createApiFeature } from './create-api-feature'

export async function generatorApiFeatureAuth(host: Tree, options: ApiFeatureGeneratorSchema) {
  await createApiFeature(host, 'data-access', {
    ...options,
    lib: {
      deps: {
        '@nestjs/jwt': versions.nestjsJwt,
        '@nestjs/passport': versions.nestjsPassport,
        bcryptjs: versions.bcryptjs,
        passport: versions.passport,
        'passport-jwt': versions.passportJwt,
      },
    },
  })
  await createApiFeature(host, 'feature', options)
  await createApiFeature(host, 'util', options)
}
