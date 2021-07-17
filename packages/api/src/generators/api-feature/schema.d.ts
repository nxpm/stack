import { BaseSchema } from '@nxpm/common'

export type ApiFeatureType = 'account' | 'auth' | 'core' | 'user'

export interface ApiFeatureGeneratorSchema extends BaseSchema {
  name: string
  type: ApiFeatureType
}
