import { BaseSchema } from '../../utils'

export interface ApiLibSchematicSchema extends BaseSchema {
  type: 'data-access' | 'feature' | 'ui' | 'util'
}
