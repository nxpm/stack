import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminFeatureCoreSchematicSchema } from './schema'

export default function (options: AdminFeatureCoreSchematicSchema): Rule {
  const name = options.name || 'core'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `feature-${name}` }, ProjectType.Library)
  const libModule = `${normalizedOptions.projectRoot}/src/lib/${normalizedOptions.projectName}.module.ts`
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'feature',
    }),
    addFiles(normalizedOptions),
    externalSchematic('@nrwl/angular', 'ngrx', {
      name: 'app',
      facade: true,
      root: true,
      module: libModule,
    }),
  ])
}
