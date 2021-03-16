import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'

import { addFiles, normalizeOptions } from '../../utils'

import { InitSchematicSchema } from './schema'

/**
 * When generating these generators, the templates get renamed.
 *
 * This method renames the generator template files back to the expected name.
 */
function renameGeneratorFiles(host: Tree, ctx: SchematicContext, name: string, base: string, files: string[]) {
  for (const file of files) {
    const filePath = `${base}/${name}.${file}.ts`
    if (host.exists(filePath)) {
      host.rename(filePath, `${base}/__name__.${file}.ts__tmpl__`)
    } else {
      ctx.logger.warn(`Can't find ${filePath}`)
    }
  }
}

function addWorkspaceGenerators(name, normalizedOptions): Rule {
  return chain([
    addFiles({ ...normalizedOptions, projectRoot: './tools/generators/' }, './generators', {
      tmplEnd: '%>',
      tmplStart: '<%=',
      name: name || 'web',
    }),
    (host, ctx) => {
      renameGeneratorFiles(host, ctx, name, `tools/generators/web-component/files`, ['component', 'module'])
      renameGeneratorFiles(host, ctx, name, `tools/generators/web-module/files`, ['component', 'module', 'store'])
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
