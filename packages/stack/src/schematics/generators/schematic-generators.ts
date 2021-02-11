import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'

import { addFiles, normalizeOptions } from '../../utils'

import { InitSchematicSchema } from './schema'

function addWorkspaceGenerators(name, normalizedOptions): Rule {
  return chain([
    addFiles({ ...normalizedOptions, projectRoot: './tools/generators/' }, './generators', {
      tmplEnd: '%>',
      tmplStart: '<%=',
      name: name || 'web',
    }),
    (host, ctx) => {
      const base = `tools/generators/web-module/files`
      const files = ['component', 'module', 'store']
      for (const file of files) {
        const filePath = `${base}/${name}.${file}.ts`
        if (host.exists(filePath)) {
          host.rename(filePath, `${base}/__name__.${file}.ts__tmpl__`)
        } else {
          ctx.logger.warn(`Can't find ${filePath}`)
        }
      }
    },
  ])
}

export default function (options: InitSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options, ProjectType.Application)

  return chain([
    addWorkspaceGenerators(normalizedOptions.webAppName, {
      ...normalizedOptions,
      webName: normalizedOptions.webAppName,
    }),
  ])
}
