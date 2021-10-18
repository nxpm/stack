import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit'
import { NormalizedSchema } from '../interfaces'

export function addFiles(
  host: Tree,
  options: NormalizedSchema,
  srcFolder: string,
  extraOptions: Record<string, string> = {},
) {
  const api = names(options.appNameApi)
  const mobile = names(options.appNameMobile)
  const web = names(options.appNameWeb)
  const project = names(options.projectName || '')
  const root = options.projectRoot || '.'
  const templateOptions = {
    ...options,
    ...names(options.name),
    api,
    mobile,
    web,
    project,
    offsetFromRoot: offsetFromRoot(root),
    template: '',
    tmpl: '',
    ...extraOptions,
  }
  generateFiles(host, srcFolder, root, templateOptions)
}
