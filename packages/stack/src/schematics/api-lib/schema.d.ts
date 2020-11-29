import { BaseSchema } from '../../utils'

export interface ApiLibSchematicSchema extends BaseSchema {
  classic?: boolean
  type: 'data-access' | 'feature' | 'ui' | 'util'
}
