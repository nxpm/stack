import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { WebLayoutSchematicSchema } from './schema'

export default function (options: WebLayoutSchematicSchema): Rule {
  const name = options.name || 'layout'
  const library = options.library || 'bootstrap'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('web-lib', {
      directory,
      name,
      type: 'layout',
    }),
    addFiles(normalizedOptions, `./files/${library}`),
  ])
}
