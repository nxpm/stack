import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, createProjectName, normalizeOptions } from '../../utils'
import { WebLibSchematicSchema } from './schema'

export default function (options: WebLibSchematicSchema): Rule {
  const directory = options.directory || 'web'
  const name =
    options.name === options.type ? options.type : createProjectName(options.name, options.type, options.classic)

  const normalizedOptions = normalizeOptions<WebLibSchematicSchema>(
    { ...options, directory, name },
    ProjectType.Library,
  )
  return chain([
    externalSchematic('@nrwl/angular', 'library', {
      name,
      directory,
      tags: `scope:${directory},type:${options.type}`,
      style: 'scss',
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
