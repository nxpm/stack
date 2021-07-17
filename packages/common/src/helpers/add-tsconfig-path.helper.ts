import { Tree, updateJson } from '@nrwl/devkit'

export function addTsconfigPath(host: Tree, packageName: string, paths: string[]) {
  updateJson(host, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = {
      [packageName]: paths,
      ...json.compilerOptions.paths,
    }
    return json
  })
}
