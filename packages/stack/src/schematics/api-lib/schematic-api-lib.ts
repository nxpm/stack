import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, createProjectName, normalizeOptions } from '../../utils'
import { ApiLibSchematicSchema } from './schema'

export default function (options: ApiLibSchematicSchema): Rule {
  const directory = options.directory || 'api'
  const name =
    options.name === options.type ? options.type : createProjectName(options.name, options.type, options.classic)

  const normalizedOptions = normalizeOptions<ApiLibSchematicSchema>(
    { ...options, directory, name },
    ProjectType.Library,
  )
  return chain([
    externalSchematic('@nrwl/nest', 'library', {
      name,
      directory,
      tags: `scope:${directory},type:${options.type}`,
    }),
    addFiles(normalizedOptions),
  ])
}
