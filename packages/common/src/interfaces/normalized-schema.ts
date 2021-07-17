import { BaseSchema } from './base-schema'
import { AppTypeApi, AppTypeMobile, AppTypeWeb } from './app-types'

export interface NormalizedSchema extends BaseSchema {
  npmScope: string
  appNameApi: string
  appNameMobile: string
  appNameWeb: string
  appTypeApi: AppTypeApi
  appTypeMobile: AppTypeMobile
  appTypeWeb: AppTypeWeb
  skipApi: boolean
  skipMobile: boolean
  skipWeb: boolean
  projectName?: string
  projectRoot?: string
  projectDirectory?: string
  parsedTags?: string[]
}
