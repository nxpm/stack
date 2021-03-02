import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppAssets, updateProjectArchitects } from '../../utils'
import { MobileAssetsSchematicSchema } from './schema'

export default function (options: MobileAssetsSchematicSchema): Rule {
  const name = options.name || 'assets'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('web-lib', {
      directory,
      name,
      type: 'assets',
    }),
    addFiles(normalizedOptions),
    updateAppAssets(appName, [
      {
        glob: '**/*.svg',
        input: 'node_modules/ionicons/dist/ionicons/svg',
        output: './svg',
      },
      {
        glob: 'favicon.ico',
        input: `libs/${appName}/${name}/src`,
        output: './',
      },
      {
        glob: '**/*',
        input: `libs/${appName}/${name}/src/assets`,
        output: 'assets',
      },
    ]),
    updateProjectArchitects(projectName),
    removeFiles(
      [
        `src/lib/${projectName}.module.ts`,
        `src/lib/`,
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
