import { BaseSchema } from '@nxpm/common'

export type MobileLibType = 'data-access' | 'feature' | 'none' | 'util' | 'ui'

export interface MobileLibGeneratorSchema extends BaseSchema {
  name: string
  prefix?: string
  type: MobileLibType
}
