import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'
import { addFiles, NormalizedSchema } from '../../../utils'

export function createUiLib(
  directory: string,
  name: string,
  path: string,
  deps: Record<string, string>,
  normalizedOptions: NormalizedSchema,
): Rule {
  return chain([
    addDepsToPackageJson(deps, {}, true),
    schematic('web-lib', {
      directory,
      name,
      type: 'ui',
      classic: true,
    }),
    addFiles(normalizedOptions, path),
  ])
}
