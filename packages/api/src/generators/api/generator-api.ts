import { formatFiles, Tree } from '@nrwl/devkit'
import { applicationGenerator as nestApplicationGenerator } from '@nrwl/nest'
import { uniq } from '@nrwl/nx-plugin/testing'
import { addFiles, addRunScript, createDotEnv, normalizeOptions, removeFiles } from '@nxpm/common'
import { join } from 'path'
import { ApiGeneratorSchema } from './schema'

import { generatorApiE2e } from '../api-e2e/generator-api-e2e'

import {
  generatorApiFeatureAccount,
  generatorApiFeatureAuth,
  generatorApiFeatureCore,
  generatorApiFeatureUser,
} from '../api-feature'

export async function generatorApi(host: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  const name = normalizedOptions.name
  const schemaName = uniq(`${normalizedOptions.npmScope}-${name}`)

  // api application
  await nestApplicationGenerator(host, {
    ...normalizedOptions,
    name,
  })

  // api application files
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  // api feature account
  await generatorApiFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // api feature auth
  await generatorApiFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // api feature core
  await generatorApiFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // api feature user
  await generatorApiFeatureUser(host, {
    ...normalizedOptions,
    directory: name,
    name: 'user',
    type: 'user',
  })

  // api e2e
  await generatorApiE2e(host, {
    ...normalizedOptions,
    name: `${name}-e2e`,
  })

  // api run-scripts
  addRunScript(host, `build:${name}`, `nx build ${name} --prod`)
  addRunScript(host, `dev:${name}`, `nx serve ${name}`)

  // Create .env and .env.example file
  createDotEnv(host, [
    `NODE_ENV=development`,
    `PORT=3000`,
    `DATABASE_URL=postgresql://prisma:prisma@localhost:5432/prisma?schema=${schemaName}`,
    `JWT_SECRET=NxpmDotDevJwtSecret`,
  ])

  // Remove obsolete files
  removeFiles(
    host,
    [`.gitkeep`, `app.controller.ts`, `app.controller.spec.ts`, `app.service.ts`, `app.service.spec.ts`],
    `${normalizedOptions.projectRoot}/src/app/`,
  )

  // Format files
  await formatFiles(host)
}
