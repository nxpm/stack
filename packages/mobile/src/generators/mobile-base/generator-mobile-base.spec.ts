import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readJson, readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorMobileBase } from './generator-mobile-base'
import { MobileBaseGeneratorSchema } from './schema'
import { applicationGenerator } from '@nrwl/angular/generators'

describe('mobile-base generator', () => {
  let appTree: Tree
  const options: MobileBaseGeneratorSchema = { name: 'assets', mobileName: 'mobile-test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(appTree, { name: options.mobileName })
    await generatorMobileBase(appTree, options)

    const nxJson = readJson(appTree, 'nx.json')
    expect(nxJson).toMatchSnapshot()

    const configApp = readProjectConfiguration(appTree, `${options.mobileName}`)
    expect(configApp).toMatchSnapshot()

    const configAssets = readProjectConfiguration(appTree, `${options.mobileName}-assets`)
    expect(configAssets).toMatchSnapshot()

    const configEnvironments = readProjectConfiguration(appTree, `${options.mobileName}-environments`)
    expect(configEnvironments).toMatchSnapshot()
  })
})
