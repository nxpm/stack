import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { MobileGeneratorSchema } from './schema'
import { addFiles, addProxyConfig, addRunScript, normalizeOptions, setServePort, versions } from '@nxpm/common'
import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators'
import { join } from 'path'
import { generatorMobileBase } from '../mobile-base/generator-mobile-base'
import {
  generateMobileFeatureAbout,
  generateMobileFeatureAccount,
  generateMobileFeatureAuth,
  generateMobileFeatureCore,
  generateMobileFeatureDashboard,
  generateMobileFeatureLayout,
  generateMobileFeatureShell,
} from '../mobile-feature'
import { generatorMobileUi } from '../mobile-ui/generator-mobile-ui'

export async function generatorMobile(host: Tree, options: MobileGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  // console.log({ normalizedOptions })
  const name = normalizedOptions.name || 'mobile'

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

  await generatorMobileBase(host, {
    ...normalizedOptions,
    mobileName: name,
  })

  await generatorMobileUi(host, {
    ...normalizedOptions,
    mobileName: name,
    library: 'tailwind',
  })

  // api feature about
  await generateMobileFeatureAbout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'about',
    type: 'about',
  })

  // api feature account
  await generateMobileFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // api feature auth
  await generateMobileFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // api feature core
  await generateMobileFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // api feature dashboard
  await generateMobileFeatureDashboard(host, {
    ...normalizedOptions,
    directory: name,
    name: 'dashboard',
    type: 'dashboard',
  })

  // api feature layout
  await generateMobileFeatureLayout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'layout',
    type: 'layout',
  })

  // api feature shell
  await generateMobileFeatureShell(host, {
    ...normalizedOptions,
    directory: name,
    name: 'shell',
    type: 'shell',
  })

  await formatFiles(host)
  addRunScript(host, `build:${name}`, `nx build ${name} --prod`)
  addRunScript(host, `dev:${name}`, `nx serve ${name} --hmr`)
  addProxyConfig(host, name)
  setServePort(host, name, 4800)
  addDependenciesToPackageJson(
    host,
    {
      '@angular/cdk': versions.angularCdk,
      '@apollo/client': versions.apolloClient,
      '@ngrx/component-store': versions.ngrxComponentStore,
      'apollo-angular': versions.apolloAngular,
      '@ionic/angular': versions.ionicAngular,
      '@ionic-native/core': versions.ionicNative,
      '@ionic-native/splash-screen': versions.ionicNative,
      '@ionic-native/status-bar': versions.ionicNative,
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
