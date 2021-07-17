import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit'
import { NormalizedSchema } from '../interfaces'

export function addFiles(host: Tree, options: NormalizedSchema, srcFolder: string) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  }
  generateFiles(host, srcFolder, options.projectRoot, templateOptions)
}
