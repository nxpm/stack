import { BaseSchema } from '@nxpm/common'

export type ApiLibType = 'data-access' | 'feature' | 'util'

export interface ApiLibGeneratorSchema extends BaseSchema {
  name: string
  type: ApiLibType
}
