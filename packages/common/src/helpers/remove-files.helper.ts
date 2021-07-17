import { Tree } from '@nrwl/devkit'
import { join } from 'path'

export function removeFiles(host: Tree, files: string[], basePath?: string) {
  for (const file of files) {
    host.delete(join(basePath, file))
  }
}
