import { ProjectType, Tree } from '@nrwl/devkit'
import { BaseSchema, NormalizedSchema } from '../interfaces'
import { projectRootDir, toFileName } from '@nrwl/workspace'

export function normalizeOptions<T extends BaseSchema>(
  host: Tree,
  options: T,
  projectType?: ProjectType,
): NormalizedSchema {
  const name = toFileName(options.name)
  const nxJson = JSON.parse(host.read('nx.json').toString())
  const appNameApi = options.apiName || 'api'
  const appNameMobile = options.mobileName || 'mobile'
  const appNameWeb = options.webName || 'web'

  const baseResult = {
    // ...options,
    npmScope: nxJson.npmScope,
    appNameApi,
    appNameMobile,
    appNameWeb,
    name,
  }

  if (!projectType) {
    return baseResult
  }

  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name
  const projectName = projectDirectory?.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType as any)}/${projectDirectory}`
  const parsedTags: string[] = options.tags ? options.tags?.split(',').map((s) => s.trim()) : []

  return {
    ...baseResult,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}
