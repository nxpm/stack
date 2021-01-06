import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { WebAuthUiSchematicSchema } from './schema'

export default function (options: WebAuthUiSchematicSchema): Rule {
  const name = options.name || 'auth'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/ui` }, ProjectType.Library)
  return chain([
    schematic('web-lib', {
      directory,
      name,
      type: 'ui',
    }),
    addFiles(normalizedOptions),
  ])
}
