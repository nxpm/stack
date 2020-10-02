import { BaseSchema } from '../../utils'

export interface AdminLibSchematicSchema extends BaseSchema {
  buildable?: boolean
  prefix?: string
  publishable?: boolean
  type: 'assets' | 'data-access' | 'feature' | 'style' | 'ui' | 'util'
}
