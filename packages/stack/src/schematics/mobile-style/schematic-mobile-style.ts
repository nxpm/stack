import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles, updateAppStyles, updateProjectArchitects } from '../../utils'
import { MobileStyleSchematicSchema } from './schema'

export default function (options: MobileStyleSchematicSchema): Rule {
  const name = options.name || 'style'
  const library = options.library || 'ionic-angular'
  const style = 'css'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('web-lib', {
      directory,
      name,
      type: 'style',
    }),
    addFiles(normalizedOptions, `./files/${library}`),
    updateAppStyles(appName, [
      `libs/${appName}/${name}/src/index.${style}`,
      { input: `libs/${appName}/${name}/src/theme/variables.${style}` },
    ]),
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
