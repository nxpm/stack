import { chain, externalSchematic, noop, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { addDepsToPackageJson, formatFiles, ProjectType } from '@nrwl/workspace'
import { stringify } from 'yaml'
import { RepositoryInitializerTask } from '@angular-devkit/schematics/tasks'

import {
  addPluginToNxJson,
  addRunScript,
  configureHuskyLintStaged,
  configureNxJsonDefaultBase,
  normalizeOptions,
  PluginForNxJson,
  removeFiles,
} from '../../utils'

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

function addNxpmPluginToNxJson(apiProjectName = 'api', webProjectName = 'web'): Rule {
  const nxPlugin: PluginForNxJson = {
    '@nxpm/stack': {
      api: { project: apiProjectName },
      web: { project: webProjectName },
    },
  }
  return addPluginToNxJson(nxPlugin)
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

function addDockerCompose(): Rule {
  const file = 'docker-compose.yml'
  const structure = {
    version: '3',
    services: {
      postgres: {
        image: 'postgres',
        ports: ['5432:5432'],
        environment: {
          POSTGRES_DB: 'prisma',
          POSTGRES_USER: 'prisma',
          POSTGRES_PASSWORD: 'prisma',
        },
        volumes: ['./tmp/postgres:/var/lib/postgresql/data'],
      },
    },
  }

  return (tree: Tree) => {
    if (!tree.exists(file)) {
      tree.create(file, stringify(structure))
    }
  }
}

export default function (options: InitSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options, ProjectType.Application)
  const webName = options.name
  const webStyleLibrary = options.webStyleLibrary || 'tailwind'
  const apiName = 'api'
  return chain([
    addDepsToPackageJson(
      {},
      {
        '@nxpm/cli': '^4.1.2',
        husky: '^4.3.0',
        'lint-staged': '^10.4.0',
      },
      true,
    ),
    updatePrettierConfig(),
    addDockerfile(),
    addDockerignore(),
    addDockerCompose(),
    configureHuskyLintStaged(),
    configureNxJsonDefaultBase('main'),
    addNxpmPluginToNxJson(apiName, webName),
    addRunScript('docker:push', `docker push ${normalizedOptions.npmScope}/${apiName}`, true),
    addRunScript('docker:run', `docker run -it -p 8000:3000 ${normalizedOptions.npmScope}/${apiName}`, true),
    addRunScript('docker:build', `docker build . -t ${normalizedOptions.npmScope}/${apiName}`, true),
    addRunScript('test:ci', `yarn prisma:apply && yarn e2e api-e2e`, true),
    addRunScript('start', 'node dist/apps/api/main.js', true),
    addRunScript('build', `yarn build:${webName} && yarn build:${apiName}`, true),
    schematic('api', { name: apiName }),
    schematic('web', { name: webName, styleLibrary: webStyleLibrary }),
    options?.ci === 'github' ? externalSchematic('@nxpm/ci', 'github', {}) : noop(),
    removeFiles([`apps/.gitkeep`, `libs/.gitkeep`]),
    formatFiles(),
    () => {
      new RepositoryInitializerTask(options.directory, {
        message: 'Initial commit of @nxpm/stack',
      })
    },
  ])
}
