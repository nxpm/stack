import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminLibSchematicSchema } from './schema'

export default function (options: AdminLibSchematicSchema): Rule {
  const directory = options.directory || 'admin'
  const name = options.name === options.type ? options.type : `${options.type}-${options.name}`

  const normalizedOptions = normalizeOptions<AdminLibSchematicSchema>(
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
    }),
    addFiles(normalizedOptions),
  ])
}
