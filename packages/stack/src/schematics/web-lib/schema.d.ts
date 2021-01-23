import { BaseSchema } from '../../utils'

export interface WebLibSchematicSchema extends BaseSchema {
  buildable?: boolean
  classic?: boolean
  prefix?: string
  style?: 'css' | 'scss'
  publishable?: boolean
  type: 'assets' | 'data-access' | 'feature' | 'style' | 'ui' | 'util'
}
