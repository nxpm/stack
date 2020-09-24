import { BaseSchema } from '../../utils'

export interface AdminLibSchematicSchema extends BaseSchema {
  buildable?: boolean
  prefix?: string
  publishable?: boolean
  type: 'data-access' | 'feature' | 'ui' | 'util'
}
