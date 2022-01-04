import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators'
import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { addFiles, addProxyConfig, addRunScript, logEntry, normalizeOptions, versions } from '@nxpm/common'
import { join } from 'path'
import { generatorWebBase } from '../web-base/generator-web-base'
import {
  generateWebFeatureAbout,
  generateWebFeatureAccount,
  generateWebFeatureAdmin,
  generateWebFeatureAuth,
  generateWebFeatureCore,
  generateWebFeatureDashboard,
  generateWebFeatureLayout,
  generateWebFeatureShell,
} from '../web-feature'
import { generatorWebUi } from '../web-ui/generator-web-ui'
import { WebGeneratorSchema } from './schema'

export async function generatorWeb(host: Tree, options: WebGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  // console.log({ normalizedOptions })
  const name = normalizedOptions.name || 'web'
  const startTime = new Date()
  // web application
  logEntry(`  -> web application`, startTime)
  await angularApplicationGenerator(host, {
    // ...normalizedOptions,
    name,
    backendProject: normalizedOptions.appNameApi,
    inlineStyle: true,
    inlineTemplate: true,
    skipFormat: true,
  })

  // web application files
  logEntry(`  -> web application files`, startTime)
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  logEntry(`  -> web base`, startTime)
  await generatorWebBase(host, {
    ...normalizedOptions,
    webName: name,
  })

  logEntry(`  -> web ui`, startTime)
  await generatorWebUi(host, {
    ...normalizedOptions,
    webName: name,
    library: 'tailwind',
  })

  // web feature about
  logEntry(`  -> web feature about`, startTime)
  await generateWebFeatureAbout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'about',
    type: 'about',
  })

  // web feature account
  logEntry(`  -> web feature account`, startTime)
  await generateWebFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // web feature admin
  logEntry(`  -> web feature admin`, startTime)
  await generateWebFeatureAdmin(host, {
    ...normalizedOptions,
    directory: name,
    name: 'admin',
    type: 'admin',
  })

  // web feature auth
  logEntry(`  -> web feature auth`, startTime)
  await generateWebFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // web feature core
  logEntry(`  -> web feature core`, startTime)
  await generateWebFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // web feature dashboard
  logEntry(`  -> web feature dashboard`, startTime)
  await generateWebFeatureDashboard(host, {
    ...normalizedOptions,
    directory: name,
    name: 'dashboard',
    type: 'dashboard',
  })

  // web feature layout
  logEntry(`  -> web feature layout`, startTime)
  await generateWebFeatureLayout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'layout',
    type: 'layout',
  })

  // web feature shell
  logEntry(`  -> web feature shell`, startTime)
  await generateWebFeatureShell(host, {
    ...normalizedOptions,
    directory: name,
    name: 'shell',
    type: 'shell',
  })

  await formatFiles(host)
  addRunScript(host, `build:${name}`, `nx build ${name} --prod`)
  addRunScript(host, `dev:${name}`, `nx serve ${name} --hmr`)
  addProxyConfig(host, name)
  addDependenciesToPackageJson(
    host,
    {
      '@angular/cdk': versions.angularCdk,
      '@apollo/client': versions.apolloClient,
      '@ngrx/component-store': versions.ngrxComponentStore,
      'apollo-angular': versions.apolloAngular,
    },
    {
      '@angular-devkit/core': versions.angularDevkitCore,
      '@graphql-codegen/cli': versions.graphqlCodegenCli,
      '@graphql-codegen/introspection': versions.graphqlCodegenIntrospection,
      '@graphql-codegen/typescript': versions.graphqlCodegenTypescript,
      '@graphql-codegen/typescript-apollo-angular': versions.graphqlCodegenTypescriptApolloAngular,
      '@graphql-codegen/typescript-operations': versions.graphqlCodegenTypescriptOperations,
      '@ngneat/spectator': versions.ngneatSpectator,
    },
  )
}
