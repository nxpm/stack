import { BaseSchema } from '@nxpm/common'

export type WebLibType = 'data-access' | 'feature' | 'none' | 'util' | 'ui'

export interface WebLibGeneratorSchema extends BaseSchema {
  name: string
  prefix?: string
  type: WebLibType
}
