import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { WebUiLibsSchematicSchema } from './schema'

export default function (options: WebUiLibsSchematicSchema): Rule {
  return chain([
    createUiFormLib(options),
    // createUiLoadingLib
    // createUiIconLib
    // createUiPageLib
    // createUiPageHeaderLib
    // createUiSidebarPageLib
  ])
}

function createUiFormLib(options: WebUiLibsSchematicSchema): Rule {
  const name = 'form'
  const library = options.library || 'tailwind'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)
  const deps = library === 'bootstrap' ? { '@ngx-formly/bootstrap': '^5.10.8' } : {}

  return createUiLib(
    directory,
    name,
    `./files/${name}/${library}`,
    {
      '@ngx-formly/core': '^5.10.8',
      ...deps,
    },
    normalizedOptions,
  )
}

function createUiLib(directory: string, name: string, path: string, deps: any, normalizedOptions): Rule {
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
