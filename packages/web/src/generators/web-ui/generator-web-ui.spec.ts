import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readJson, Tree } from '@nrwl/devkit'

import { generatorWebUi } from './generator-web-ui'
import { WebUiGeneratorSchema } from './schema'
import { applicationGenerator } from '@nrwl/angular/generators'

describe('web-ui generator', () => {
  let appTree: Tree
  const options: WebUiGeneratorSchema = { name: 'test', library: 'tailwind', webName: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(appTree, { name: options.webName })
    await generatorWebUi(appTree, options)

    const nxJson = readJson(appTree, 'nx.json')
    expect(nxJson).toMatchSnapshot()

    // const configApp = readProjectConfiguration(appTree, `${options.webName}`)
    // expect(configApp).toMatchSnapshot()
  }, 10000)
})
