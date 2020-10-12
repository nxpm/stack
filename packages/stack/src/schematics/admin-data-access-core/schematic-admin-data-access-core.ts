import { chain, externalSchematic, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions } from '../../utils'
import { AdminDataAccessCoreSchematicSchema } from './schema'

export default function (options: AdminDataAccessCoreSchematicSchema): Rule {
  const name = options.name || 'data-access'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `data-access-${name}` }, ProjectType.Library)
  const libModule = `${normalizedOptions.projectRoot}/src/lib/${normalizedOptions.projectName}.module.ts`
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'data-access',
    }),
    addFiles(normalizedOptions),
    addRunScript('sdk:watch', 'yarn sdk --watch'),
    addRunScript('sdk', `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`),
    externalSchematic('@nrwl/angular', 'ngrx', {
      name: 'app',
      facade: true,
      root: true,
      module: libModule,
    }),
    (tree: Tree) => {
      const file = tree.read(libModule).toString()
      tree.overwrite(
        libModule,
        file
          // Patch because the Ngrx generator does not seem to import this correctly.
          .replace(`EffectsModule.forRoot([])`, `, EffectsModule.forRoot([]),`)
          // We get the environment from another library
          .replace(`'../environments/environment'`, `'@${normalizedOptions.npmScope}/${options.appName}/feature-core'`),
      )
      return tree
    },
  ])
}
