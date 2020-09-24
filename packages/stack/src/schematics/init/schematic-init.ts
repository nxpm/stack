import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, formatFiles, projectRootDir, ProjectType, toFileName } from '@nrwl/workspace'
import { addRunScript, configureHuskyLintStaged, removeFiles } from '../../utils'

import { InitSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends InitSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}

function normalizeOptions(options: InitSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name)
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

function updatePrettierConfig(options: NormalizedSchema): Rule {
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
  const normalizedOptions = normalizeOptions(options)
  return chain([
    addDepsToPackageJson({}, { husky: '^4.3.0', 'lint-staged': '^10.4.0' }, true),
    updatePrettierConfig(normalizedOptions),
    configureHuskyLintStaged(),
    schematic('api', { name: 'api' }),
    schematic('admin', { name: options.name }),
    addRunScript('start', 'node dist/apps/api/main.js', true),
    addRunScript('build', `yarn build:${options.name} && yarn build:api`, true),
    removeFiles([`apps/.gitkeep`, `libs/.gitkeep`]),
    formatFiles(),
  ])
}
