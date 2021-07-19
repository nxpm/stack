import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { WebGeneratorSchema } from './schema'
import { addFiles, addProxyConfig, addRunScript, normalizeOptions, versions } from '@nxpm/common'
import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators'
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

export async function generatorWeb(host: Tree, options: WebGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  // console.log({ normalizedOptions })
  const name = normalizedOptions.name || 'web'

  // api application
  await angularApplicationGenerator(host, {
    // ...normalizedOptions,
    name,
    backendProject: normalizedOptions.appNameApi,
    inlineStyle: true,
    inlineTemplate: true,
    skipFormat: true,
  })

  // api application files
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  await generatorWebBase(host, {
    ...normalizedOptions,
    webName: name,
  })

  await generatorWebUi(host, {
    ...normalizedOptions,
    webName: name,
    library: 'tailwind',
  })

  // api feature about
  await generateWebFeatureAbout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'about',
    type: 'about',
  })

  // api feature account
  await generateWebFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // api feature admin
  await generateWebFeatureAdmin(host, {
    ...normalizedOptions,
    directory: name,
    name: 'admin',
    type: 'admin',
  })

  // api feature auth
  await generateWebFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // api feature core
  await generateWebFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // api feature dashboard
  await generateWebFeatureDashboard(host, {
    ...normalizedOptions,
    directory: name,
    name: 'dashboard',
    type: 'dashboard',
  })

  // api feature layout
  await generateWebFeatureLayout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'layout',
    type: 'layout',
  })

  // api feature shell
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
      '@graphql-codegen/cli': versions.graphqlCodegenCli,
      '@graphql-codegen/introspection': versions.graphqlCodegenIntrospection,
      '@graphql-codegen/typescript': versions.graphqlCodegenTypescript,
      '@graphql-codegen/typescript-apollo-angular': versions.graphqlCodegenTypescriptApolloAngular,
      '@graphql-codegen/typescript-operations': versions.graphqlCodegenTypescriptOperations,
      '@ngneat/spectator': versions.ngneatSpectator,
    },
  )
}
