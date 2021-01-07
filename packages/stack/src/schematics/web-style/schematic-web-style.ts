import { chain, externalSchematic, noop, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppStyles, updateProjectArchitects } from '../../utils'
import { WebStyleSchematicSchema } from './schema'

import { RunSchematicTask } from '@angular-devkit/schematics/tasks'

function dependencies(options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up @ngneat/tailwind')
    context.addTask(
      new RunSchematicTask('@ngneat/tailwind', 'ng-add', {
        project: options.appName,
        style: 'scss',
        useCustomWebpackBeta: true,
        darkMode: 'class',
      }),
      [],
    )
  }
}

export default function (options: WebStyleSchematicSchema): Rule {
  const name = options.name || 'style'
  const library = options.library || 'bootstrap'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      library === 'bootstrap'
        ? {
            bootstrap: '^4.5.3',
            bootswatch: '^4.5.3',
          }
        : {},
      {},
      true,
    ),
    schematic('web-lib', {
      directory,
      name,
      type: 'style',
    }),
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
    library === 'tailwind' ? dependencies(options) : noop(),
  ])
}
