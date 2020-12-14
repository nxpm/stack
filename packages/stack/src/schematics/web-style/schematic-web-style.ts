import { chain, externalSchematic, noop, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppStyles, updateProjectArchitects } from '../../utils'
import { WebStyleSchematicSchema } from './schema'

export default function (options: WebStyleSchematicSchema): Rule {
  const name = options.name || 'style'
  const library = options.library || 'bootstrap'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        bootstrap: '^4.5.3',
        bootswatch: '^4.5.3',
      },
      {},
      true,
    ),
    schematic('web-lib', {
      directory,
      name,
      type: 'style',
    }),
    library === 'tailwind'
      ? externalSchematic('@ngneat/tailwind', 'ng-add', {
          project: appName,
          style: 'scss',
          'use-custom-webpack-beta': true,
        })
      : noop(),
    addFiles(normalizedOptions, `./files/${library}`),
    updateAppStyles(appName, [`libs/${appName}/${name}/src/index.scss`]),
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
