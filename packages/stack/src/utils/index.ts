export * from './helpers/dot-env'
export * from './helpers/git-ignore'
export * from './helpers/prisma'
export * from './schemas/base-schema'
export * from './schemas/normalized-schema'

import { strings } from '@angular-devkit/core'
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import {
  addDepsToPackageJson,
  getProjectConfig,
  insert,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@nrwl/workspace'
import { InsertChange } from '@nrwl/workspace/src/utils/ast-utils'
import { readJSONSync } from 'fs-extra'
import { join } from 'path'
import { BaseSchema } from './schemas/base-schema'
import { NormalizedSchema } from './schemas/normalized-schema'

export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`
}

export function configureHuskyLintStaged() {
  return updateJsonInTree(`/package.json`, (json) => {
    if (!json['husky']) {
      json['husky'] = {
        hooks: { 'pre-commit': 'lint-staged', 'pre-push': 'yarn format:check' },
      }
    }
    if (!json['lint-staged']) {
      json['lint-staged'] = {
        'nx.json': ['yarn nxpm-stack lint', 'yarn format --uncommitted'],
        '*.{js,json,css,scss,md,ts,html,graphql}': ['yarn format --uncommitted'],
      }
    }
    return json
  })
}

export function configureNxJsonDefaultBase(defaultBase: string) {
  return updateJsonInTree(`/nx.json`, (json) => {
    json['affected'] = { defaultBase }
    return json
  })
}

export type PluginForNxJson = { [key: string]: Record<string, unknown> }
export function addPluginToNxJson(plugin: PluginForNxJson) {
  return updateJsonInTree(`nx.json`, (json) => {
    if (!json['plugins']) {
      json['plugins'] = {}
    }
    json['plugins'] = { ...json['plugins'], ...plugin }
    return json
  })
}

export function addRunScript(script: string, command: string, force = false) {
  return updateJsonInTree(`/package.json`, (json) => {
    if (!json['scripts']) {
      json['scripts'] = {}
    }
    if (!json['scripts'][script] || force) {
      if (json['scripts'][script]) {
        delete json['scripts'][script]
      }
      json['scripts'] = {
        [script]: command,
        ...json['scripts'],
      }
    }
    return json
  })
}
export function lineEnd(content: string) {
  return `${content}\n`
}

export function appendToPath(path, line: string | string[]): Rule {
  const lines = Array.isArray(line) ? line : [line]
  const content = lineEnd(lines.join('\n'))
  return (tree: Tree) => {
    if (!tree.exists(path)) {
      return tree
    }
    const source = tree.read(path)?.toString()
    return insert(tree, path, [new InsertChange(path, source?.length, content)])
  }
}

export function addFiles(options: NormalizedSchema, path = './files'): Rule {
  return mergeWith(
    apply(url(path), [
      template({
        ...strings,
        ...options,
        tmpl: '',
        dot: '.',
        '.': '.',
      }),
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
    MergeStrategy.Overwrite,
  )
}

export function addTargetToProject(project, target) {
  return project.targets.add(target)
}

export function addTargetsToProject(project, targets: unknown[]) {
  return targets.map((t) => addTargetToProject(project, t))
}

export function createOrOverwrite(path, line: string | string[]): Rule {
  const lines = Array.isArray(line) ? line : [line]
  return (tree: Tree) => {
    const content = lineEnd(lines.join('\n'))
    tree.exists(path) ? tree.overwrite(path, content) : tree.create(path, content)
    return tree
  }
}

export function createRunCommand(name, commands: string | string[]) {
  commands = Array.isArray(commands) ? commands : [commands]
  return {
    name,
    builder: '@nrwl/workspace:run-commands',
    options: {
      parallel: false,
      commands: commands.map((command) => ({ command })),
    },
  }
}

export function normalizeOptions<T extends BaseSchema>(options: T, projectType: ProjectType): NormalizedSchema {
  const name = toFileName(options.name)
  const nxJson = readJSONSync(join(process.cwd(), 'nx.json'))
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []

  return {
    ...options,
    npmScope: nxJson.npmScope,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

export function removeFiles(files: string[], path = ''): Rule {
  return function (tree: Tree) {
    for (const file of files) {
      const filePath = join(path, file)
      if (tree.exists(filePath)) {
        tree.delete(filePath)
      }
    }
    return tree
  }
}

export function updateProjectArchitects(projectName: string, config: Record<string, unknown> = {}): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, projectName)
    if (projectConfig && projectConfig?.architect) {
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect = config
          json.projects[projectName] = projectConfig
          return json
        }),
      ])(host, context)
    }
  }
}

export function updateAppOptions(projectName: string, key: string, options): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectConfig = getProjectConfig(host, projectName)
    if (projectConfig && projectConfig?.architect?.build?.options[key]) {
      return chain([
        updateWorkspaceInTree((json) => {
          projectConfig.architect.build.options[key] = options
          json.projects[projectName] = projectConfig
          return json
        }),
      ])(host, context)
    }
  }
}

export function updateAppAssets(
  projectName: string,
  assets: { glob: string; input: string; output: string }[] = [],
): Rule {
  return updateAppOptions(projectName, 'assets', assets)
}

export function updateAppStyles(projectName: string, styles: string[] = []): Rule {
  return updateAppOptions(projectName, 'styles', styles)
}

export function addTsconfigPath(packageName: string, paths: string[]): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      updateJsonInTree('tsconfig.base.json', (json) => {
        json.compilerOptions.paths = {
          [packageName]: paths,
          ...json.compilerOptions.paths,
        }
        return json
      }),
    ])(host, context)
  }
}

export function addPrismaConfig(normalizedOptions: NormalizedSchema): Rule {
  const prismaFile = `libs/${normalizedOptions.directory}/${normalizedOptions.name}/src/prisma/schema.prisma`

  return (host: Tree, context: SchematicContext) => {
    return chain([
      updateJsonInTree('package.json', (json) => {
        json.prisma = { schema: prismaFile }
        json.scripts = {
          'prisma:apply': 'yarn prisma:format && yarn prisma:db-push',
          'prisma:db-push': 'yarn prisma db push --preview-feature',
          'prisma:format': 'yarn prisma format',
          'prisma:generate': 'yarn prisma generate',
          'prisma:migrate': 'yarn prisma migrate save --experimental && yarn prisma migrate up --experimental',
          'prisma:studio': 'yarn prisma studio',
          'prisma:seed': 'yarn nx workspace-generator prisma-seed',
          ...json.scripts,
        }
        return json
      }),
    ])(host, context)
  }
}

export function createProjectName(name: string, type: string, classic = false) {
  return classic ? `${type}/${name}` : `${name}/${type}`
}

export type ApiLibType = 'data-access' | 'feature' | 'util'
export function createApiLib(
  directory: string,
  name: string,
  path: string,
  type: ApiLibType,
  normalizedOptions: NormalizedSchema,
  filesToRemove: string[] = [],
  deps: Record<string, string> = {},
  devDeps: Record<string, string> = {},
): Rule {
  return chain([
    addDepsToPackageJson(deps, devDeps, true),
    schematic('api-lib', { directory, name, type }),
    addFiles(normalizedOptions, path),
    removeFiles(filesToRemove, `${normalizedOptions.projectRoot}/src/lib/`),
  ])
}

export type WebLibType = 'data-access' | 'feature' | 'util' | 'ui'

export function createWebLib(
  directory: string,
  name: string,
  path: string,
  type: WebLibType,
  normalizedOptions: NormalizedSchema,
  filesToRemove: string[] = [],
  deps: Record<string, string> = {},
  devDeps: Record<string, string> = {},
): Rule {
  return chain([
    addDepsToPackageJson(deps, devDeps, true),
    schematic('web-lib', { directory, name, type }),
    addFiles(normalizedOptions, path),
    removeFiles(filesToRemove, `${normalizedOptions.projectRoot}/src/lib/`),
  ])
}
