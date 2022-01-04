import { formatFiles, Tree } from '@nrwl/devkit'
import { applicationGenerator as nestApplicationGenerator } from '@nrwl/nest'
import { addFiles, addRunScript, createDotEnv, logEntry, normalizeOptions, removeFiles, uniq } from '@nxpm/common'
import { join } from 'path'

import { generatorApiE2e } from '../api-e2e/generator-api-e2e'

import {
  generateApiFeatureAccount,
  generateApiFeatureAuth,
  generateApiFeatureCore,
  generateApiFeatureUser,
} from '../api-feature'
import { ApiGeneratorSchema } from './schema'

export async function generatorApi(host: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  const name = normalizedOptions.name
  const schemaName = uniq(`${normalizedOptions.npmScope}-${name}`)
  const startTime = new Date()
  // api application
  logEntry(`  -> api application`, startTime)
  await nestApplicationGenerator(host, {
    ...normalizedOptions,
    name,
  })

  // api application files
  logEntry(`  -> api application files`, startTime)
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  // api feature account
  logEntry(`  -> api feature account`, startTime)
  await generateApiFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // api feature auth
  logEntry(`  -> api feature auth`, startTime)
  await generateApiFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // api feature core
  logEntry(`  -> api feature core`, startTime)
  await generateApiFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // api feature user
  logEntry(`  -> api feature user`, startTime)
  await generateApiFeatureUser(host, {
    ...normalizedOptions,
    directory: name,
    name: 'user',
    type: 'user',
  })

  // api e2e
  logEntry(`  -> api e2e`, startTime)
  await generatorApiE2e(host, {
    ...normalizedOptions,
    name: `${name}-e2e`,
  })

  // api run-scripts
  logEntry(`  -> api run-scripts`, startTime)
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
