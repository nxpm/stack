import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppAssets, updateProjectArchitects } from '../../utils'
import { AdminAssetsSchematicSchema } from './schema'

export default function (options: AdminAssetsSchematicSchema): Rule {
  const name = options.name || 'assets'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'assets',
    }),
    addFiles(normalizedOptions),
    updateAppAssets(appName, [
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
    removeFiles([
      `libs/${appName}/${name}/src/lib/${projectName}.module.ts`,
      `libs/${appName}/${name}/src/lib/`,
      `libs/${appName}/${name}/src/index.ts`,
      `libs/${appName}/${name}/src/test-setup.ts`,
      `libs/${appName}/${name}/jest.config.js`,
      `libs/${appName}/${name}/tsconfig.json`,
      `libs/${appName}/${name}/tsconfig.lib.json`,
      `libs/${appName}/${name}/tsconfig.spec.json`,
      `libs/${appName}/${name}/tslint.json`,
      `libs/${appName}/${name}/README.md`,
    ]),
  ])
}
