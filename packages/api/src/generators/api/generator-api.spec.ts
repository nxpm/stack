import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { getProjects, Tree } from '@nrwl/devkit'
import { getProjectContent, getProjectTree } from '@nxpm/common'

import { generatorApi } from './generator-api'
import { ApiGeneratorSchema } from './schema'

describe('api generator', () => {
  let appTree: Tree
  const options: ApiGeneratorSchema = { name: 'api-test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApi(appTree, options)

    // Get a list of projects that belong to the API
    const projects = Array.from(getProjects(appTree).keys()).filter((projectName) =>
      projectName.startsWith(`${options.name}`),
    )

    // Make sure that each project has the expected file tree
    for (const project of projects) {
      const tree = getProjectTree(appTree, project)
      expect(tree).toMatchSnapshot()
      const content = getProjectContent(appTree, project)
      expect(content).toMatchSnapshot()
    }
  }, 30000)
})
