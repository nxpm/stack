import { BaseSchema } from '../../utils'

export interface ApiFeatureCoreSchematicSchema extends BaseSchema {
  type: 'data-access' | 'feature' | 'ui' | 'util'
}
