import { ProjectType, readJson, Tree } from '@nrwl/devkit'
import { AppTypeApi, AppTypeMobile, AppTypeWeb, BaseSchema, NormalizedSchema } from '../interfaces'
import { projectRootDir, toFileName } from '@nrwl/workspace'

export function normalizeOptions<T extends BaseSchema>(
  host: Tree,
  options: T,
  projectType?: ProjectType,
): NormalizedSchema {
  const name = toFileName(options?.name || '')
  const nxJson = readJson(host, 'nx.json')

  const appNameApi = options.apiName || 'api'
  const appNameMobile = options.mobileName || 'mobile'
  const appNameWeb = options.webName || 'web'
  const appTypeApi = AppTypeApi.nest
  const appTypeMobile = AppTypeMobile.ionicAngular
  const appTypeWeb = AppTypeWeb.angular
  const skipApi = !!options.skipApi
  const skipMobile = !!options.skipMobile
  const skipWeb = !!options.skipWeb

  const baseResult = {
    npmScope: nxJson.npmScope,
    appNameApi,
    appNameMobile,
    appNameWeb,
    appTypeApi,
    appTypeMobile,
    appTypeWeb,
    skipApi,
    skipMobile,
    skipWeb,
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
