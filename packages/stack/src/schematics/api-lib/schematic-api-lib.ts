import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { ApiLibSchematicSchema } from './schema'

export default function (options: ApiLibSchematicSchema): Rule {
  const directory = options.directory || 'api'
  const name = options.name === options.type ? options.type : `${options.type}-${options.name}`

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
