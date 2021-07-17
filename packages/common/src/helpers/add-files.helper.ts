import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit'
import { NormalizedSchema } from '../interfaces'

export function addFiles(host: Tree, options: NormalizedSchema, srcFolder: string) {
  const api = names(options.appNameApi)
  const mobile = names(options.appNameMobile)
  const web = names(options.appNameWeb)
  const project = names(options.projectName)

  const templateOptions = {
    ...options,
    ...names(options.name),
    api,
    mobile,
    web,
    project,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    tmpl: '',
  }
  generateFiles(host, srcFolder, options.projectRoot, templateOptions)
}
