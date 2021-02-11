import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, createProjectName, normalizeOptions } from '../../utils'
import { WebUiSchematicSchema } from './schema'

export default function (options: WebUiSchematicSchema): Rule {
  const type = 'ui'
  const directory = options.directory || 'web'
  const name = createProjectName(options.name, type, true)
  const style = options.style || 'css'

  const normalizedOptions = normalizeOptions<WebUiSchematicSchema>({ ...options, directory, name }, ProjectType.Library)

  return chain([
    externalSchematic('@nrwl/angular', 'library', {
      name,
      directory,
      tags: `scope:${directory},type:${type}`,
      style,
      prefix: options.prefix || options.name,
      buildable: options.buildable || false,
      publishable: options.publishable || false,
      routing: true,
      lazy: true,
      linter: 'eslint',
    }),
    addFiles(normalizedOptions),
  ])
}
