import { sortTsConfigPaths, sortWorkspaceProjects } from './commands/workspace-lint'

describe('@nxpm/cli', () => {
  describe('lint', () => {
    it('should sort projects in a workspace file', () => {
      const workspace = { projects: { z: true, a: true } }
      const expected = { projects: { a: true, z: true } }
      expect(sortWorkspaceProjects(workspace)).toEqual(expected)
    })
    it('should sort paths in a tsconfig file', () => {
      const tsconfig = { compilerOptions: { paths: { z: true, a: true } } }
      const expected = { compilerOptions: { paths: { a: true, z: true } } }
      expect(sortTsConfigPaths(tsconfig)).toEqual(expected)
    })
  })
})
