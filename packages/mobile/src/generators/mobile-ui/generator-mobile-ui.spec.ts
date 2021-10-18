import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readJson, Tree } from '@nrwl/devkit'

import { generatorMobileUi } from './generator-mobile-ui'
import { MobileUiGeneratorSchema } from './schema'
import { applicationGenerator } from '@nrwl/angular/generators'

describe('mobile-ui generator', () => {
  let appTree: Tree
  const options: MobileUiGeneratorSchema = { name: 'test', library: 'tailwind', mobileName: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(appTree, { name: options.mobileName })
    await generatorMobileUi(appTree, options)

    const nxJson = readJson(appTree, 'nx.json')
    expect(nxJson).toMatchSnapshot()

    // const configApp = readProjectConfiguration(appTree, `${options.mobileName}`)
    // expect(configApp).toMatchSnapshot()
  }, 10000)
})
