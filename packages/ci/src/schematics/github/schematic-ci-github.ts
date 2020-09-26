import { strings } from '@angular-devkit/core'
import { apply, applyTemplates, chain, MergeStrategy, mergeWith, Rule, template, url } from '@angular-devkit/schematics'

import { GithubSchematicSchema } from './schema'

export function addFiles(options: GithubSchematicSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      template({
        ...strings,
        ...options,
        tmpl: '',
        dot: '.',
      }),
      applyTemplates({
        ...options,
      }),
    ]),
    MergeStrategy.Overwrite,
  )
}

export default function (options: GithubSchematicSchema): Rule {
  return chain([addFiles(options)])
}
