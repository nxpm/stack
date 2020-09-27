import { strings } from '@angular-devkit/core'
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import { readJsonInTree } from '@nrwl/workspace'

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
  return chain([
    (tree: Tree) => {
      const normalizedOptions = { ...options }

      if (!normalizedOptions.branch) {
        const nxJson = readJsonInTree(tree, 'nx.json')

        normalizedOptions.branch = nxJson?.affected?.defaultBase || 'main'
      }
      return addFiles(normalizedOptions)
    },
  ])
}
