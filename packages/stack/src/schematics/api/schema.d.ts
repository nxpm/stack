import { BaseSchema } from '../../utils'

export interface ApiSchematicSchema extends BaseSchema {
  name: string
  tags?: string
  webName?: string
  directory?: string
}
