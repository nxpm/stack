import { BaseSchema } from './base-schema'

export interface NormalizedSchema extends BaseSchema {
  npmScope: string
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}
