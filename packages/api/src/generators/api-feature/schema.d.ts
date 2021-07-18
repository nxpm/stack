import { BaseSchema } from '@nxpm/common'
import { ApiLibOptions } from '../../helpers'

export type ApiFeatureType = 'account' | 'auth' | 'core' | 'user'

export interface ApiFeatureGeneratorSchema extends BaseSchema {
  name: string
  type: ApiFeatureType
  lib?: Partial<ApiLibOptions>
}
