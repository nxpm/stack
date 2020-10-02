import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppStyles, updateProjectArchitects } from '../../utils'
import { AdminStyleSchematicSchema } from './schema'

export default function (options: AdminStyleSchematicSchema): Rule {
  const name = options.name || 'style'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        bootstrap: '^4.5.2',
        bootswatch: '^4.5.2',
      },
      {},
      true,
    ),
    schematic('admin-lib', {
      directory,
      name,
      type: 'style',
    }),
    addFiles(normalizedOptions),
    updateAppStyles(appName, [`apps/${appName}/src/styles.scss`, `libs/${appName}/${name}/src/index.scss`]),
    updateProjectArchitects(projectName),
    removeFiles(
      [
        `src/lib/${projectName}.module.ts`,
        `src/index.ts`,
        `src/test-setup.ts`,
        `jest.config.js`,
        `tsconfig.json`,
        `tsconfig.lib.json`,
        `tsconfig.spec.json`,
        `tslint.json`,
        `README.md`,
      ],
      `libs/${appName}/${name}/`,
    ),
  ])
}
