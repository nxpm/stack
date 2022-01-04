import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { MobileGeneratorSchema } from './schema'
import {
  addFiles,
  addProxyConfig,
  addRunScript,
  logEntry,
  normalizeOptions,
  setServePort,
  versions,
} from '@nxpm/common'
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
  const startTime = new Date()
  // mobile application
  logEntry(`  -> mobile application`, startTime)
  await angularApplicationGenerator(host, {
    // ...normalizedOptions,
    name,
    backendProject: normalizedOptions.appNameApi,
    inlineStyle: true,
    inlineTemplate: true,
    skipFormat: true,
  })

  // mobile application files
  logEntry(`  -> mobile application files`, startTime)
  addFiles(host, normalizedOptions, join(__dirname, 'files'))

  // mobile base
  logEntry(`  -> mobile base`, startTime)
  await generatorMobileBase(host, {
    ...normalizedOptions,
    mobileName: name,
  })

  // mobile files
  logEntry(`  -> mobile ui`, startTime)
  await generatorMobileUi(host, {
    ...normalizedOptions,
    mobileName: name,
    library: 'tailwind',
  })

  // mobile feature about
  logEntry(`  -> mobile feature about`, startTime)
  await generateMobileFeatureAbout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'about',
    type: 'about',
  })

  // mobile feature account
  logEntry(`  -> mobile feature account`, startTime)
  await generateMobileFeatureAccount(host, {
    ...normalizedOptions,
    directory: name,
    name: 'account',
    type: 'account',
  })

  // mobile feature auth
  logEntry(`  -> mobile feature auth`, startTime)
  await generateMobileFeatureAuth(host, {
    ...normalizedOptions,
    directory: name,
    name: 'auth',
    type: 'auth',
  })

  // mobile feature core
  logEntry(`  -> mobile feature core`, startTime)
  await generateMobileFeatureCore(host, {
    ...normalizedOptions,
    directory: name,
    name: 'core',
    type: 'core',
  })

  // mobile feature dashboard
  logEntry(`  -> mobile feature dashboard`, startTime)
  await generateMobileFeatureDashboard(host, {
    ...normalizedOptions,
    directory: name,
    name: 'dashboard',
    type: 'dashboard',
  })

  // mobile feature layout
  logEntry(`  -> mobile feature layout`, startTime)
  await generateMobileFeatureLayout(host, {
    ...normalizedOptions,
    directory: name,
    name: 'layout',
    type: 'layout',
  })

  // mobile feature shell
  logEntry(`  -> mobile feature shell`, startTime)
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
      '@graphql-codegen/add': versions.graphqlCodegenAdd,
      '@graphql-codegen/cli': versions.graphqlCodegenCli,
      '@graphql-codegen/introspection': versions.graphqlCodegenIntrospection,
      '@graphql-codegen/typescript': versions.graphqlCodegenTypescript,
      '@graphql-codegen/typescript-apollo-angular': versions.graphqlCodegenTypescriptApolloAngular,
      '@graphql-codegen/typescript-operations': versions.graphqlCodegenTypescriptOperations,
      '@ngneat/spectator': versions.ngneatSpectator,
    },
  )
}
