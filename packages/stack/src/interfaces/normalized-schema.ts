import { BaseSchema } from './base-schema'

export interface NormalizedSchema extends BaseSchema {
  npmScope: string
  appNameApi: string
  appNameMobile: string
  appNameWeb: string
  projectName?: string
  projectRoot?: string
  projectDirectory?: string
  parsedTags?: string[]
}
