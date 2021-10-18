import { BaseSchema } from '@nxpm/common'
import { MobileLibOptions } from '../../helpers'

export type MobileFeatureType = 'about' | 'account' | 'admin' | 'auth' | 'core' | 'dashboard' | 'layout' | 'shell'

export interface MobileFeatureGeneratorSchema extends BaseSchema {
  name: string
  type: MobileFeatureType
  lib?: Partial<MobileLibOptions>
}
