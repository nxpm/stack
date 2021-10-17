import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { getProjects, readProjectConfiguration, Tree } from '@nrwl/devkit'
import { getProjectContent, getProjectContentRoot, getProjectTree } from '@nxpm/common'

import { generatorWeb } from './generator-web'
import { WebGeneratorSchema } from './schema'

describe('web generator', () => {
  let appTree: Tree
  const options: WebGeneratorSchema = { name: 'web-test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorWeb(appTree, options)

    // Get a list of projects that belong to the API
    const projects = Array.from(getProjects(appTree).keys()).filter((projectName) =>
      projectName.startsWith(`${options.name}`),
    )

    // Make sure that each project has the expected file tree
    for (const project of projects) {
      const projectConfig = readProjectConfiguration(appTree, project)
      expect(projectConfig).toMatchSnapshot()
      const tree = getProjectTree(appTree, project)
      expect(tree).toMatchSnapshot()
      const content = getProjectContent(appTree, project)
      expect(content).toMatchSnapshot()
    }

    const appRoot = getProjectContentRoot(appTree, options.name)
    expect(appRoot).toMatchSnapshot()
  }, 60000)
})
