import { BaseSchema } from '@nxpm/common'
import { WebLibOptions } from '../../helpers'

export type WebFeatureType = 'about' | 'account' | 'admin' | 'auth' | 'core' | 'dashboard' | 'layout' | 'shell'

export interface WebFeatureGeneratorSchema extends BaseSchema {
  name: string
  type: WebFeatureType
  lib?: Partial<WebLibOptions>
}
