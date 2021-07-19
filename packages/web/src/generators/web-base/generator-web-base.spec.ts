import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readJson, readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorWebBase } from './generator-web-base'
import { WebBaseGeneratorSchema } from './schema'
import { applicationGenerator } from '@nrwl/angular/generators'

describe('web-base generator', () => {
  let appTree: Tree
  const options: WebBaseGeneratorSchema = { name: 'assets', webName: 'web-test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(appTree, { name: options.webName })
    await generatorWebBase(appTree, options)

    const nxJson = readJson(appTree, 'nx.json')
    expect(nxJson).toMatchSnapshot()

    const configApp = readProjectConfiguration(appTree, `${options.webName}`)
    expect(configApp).toMatchSnapshot()

    const configAssets = readProjectConfiguration(appTree, `${options.webName}-assets`)
    expect(configAssets).toMatchSnapshot()

    const configEnvironments = readProjectConfiguration(appTree, `${options.webName}-environments`)
    expect(configEnvironments).toMatchSnapshot()
  })
})
