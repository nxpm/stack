import { BaseSchema } from '../../utils'

export interface ApiCoreFeatureSchematicSchema extends BaseSchema {
  type: 'data-access' | 'feature' | 'util'
  appName: string
}
