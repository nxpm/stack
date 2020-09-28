import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, formatFiles } from '@nrwl/workspace'
import { addRunScript, configureHuskyLintStaged, removeFiles } from '../../utils'

import { InitSchematicSchema } from './schema'

function updatePrettierConfig(): Rule {
  const prettierIgnore = '.prettierignore'
  const prettierIgnoreContent = ['package.json', 'dist', 'coverage', 'tmp'].join('\n')
  const prettierRc = '.prettierrc'
  const prettierRcContent = JSON.stringify(
    {
      singleQuote: true,
      printWidth: 120,
      semi: false,
      trailingComma: 'all',
      arrowParens: 'always',
    },
    null,
    2,
  )

  return (tree: Tree) => {
    if (tree.exists(prettierIgnore)) {
      tree.overwrite(prettierIgnore, prettierIgnoreContent)
    } else {
      tree.create(prettierIgnore, prettierIgnoreContent)
    }
    if (tree.exists(prettierRc)) {
      tree.overwrite(prettierRc, prettierRcContent)
    } else {
      tree.create(prettierRc, prettierRcContent)
    }
  }
}

export default function (options: InitSchematicSchema): Rule {
  return chain([
    addDepsToPackageJson({}, { husky: '^4.3.0', 'lint-staged': '^10.4.0' }, true),
    updatePrettierConfig(),
    configureHuskyLintStaged(),
    schematic('api', { name: 'api' }),
    schematic('admin', { name: options.name, backendProject: 'api' }),
    addRunScript('start', 'node dist/apps/api/main.js', true),
    addRunScript('build', `yarn build:${options.name} && yarn build:api`, true),
    removeFiles([`apps/.gitkeep`, `libs/.gitkeep`]),
    formatFiles(),
  ])
}
