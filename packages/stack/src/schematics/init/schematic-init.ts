import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, formatFiles, ProjectType } from '@nrwl/workspace'
import { addRunScript, configureHuskyLintStaged, normalizeOptions, removeFiles } from '../../utils'

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

function addDockerfile(): Rule {
  const file = 'Dockerfile'
  const contents = [
    'FROM node:14-alpine',
    '',
    'WORKDIR /workspace',
    '',
    'COPY package.json yarn.lock /workspace/',
    '',
    'RUN yarn',
    '',
    'COPY . .',
    '',
    'RUN yarn build',
    '',
    'CMD ["yarn", "start"]',
  ].join('\n')
  return (tree: Tree) => {
    if (!tree.exists(file)) {
      tree.create(file, contents)
    }
  }
}
function addDockerignore(): Rule {
  const file = '.dockerignore'
  const contents = ['dist', 'node_modules'].join('\n')
  return (tree: Tree) => {
    if (!tree.exists(file)) {
      tree.create(file, contents)
    }
  }
}

export default function (options: InitSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options, ProjectType.Application)
  const adminName = options.name
  const apiName = 'api'
  return chain([
    addDepsToPackageJson({}, { husky: '^4.3.0', 'lint-staged': '^10.4.0' }, true),
    updatePrettierConfig(),
    addDockerfile(),
    addDockerignore(),
    configureHuskyLintStaged(),
    schematic('api', { name: apiName }),
    schematic('admin', { name: adminName }),
    addRunScript('start', 'node dist/apps/api/main.js', true),
    addRunScript('build', `yarn build:${adminName} && yarn build:${apiName}`, true),
    addRunScript('docker:build', `docker build . -t ${normalizedOptions.npmScope}/${apiName}`, true),
    addRunScript('docker:run', `docker run -it -p 8000:3000 ${normalizedOptions.npmScope}/${apiName}`, true),
    addRunScript('docker:push', `docker push ${normalizedOptions.npmScope}/${apiName}`, true),
    removeFiles([`apps/.gitkeep`, `libs/.gitkeep`]),
    formatFiles(),
  ])
}
