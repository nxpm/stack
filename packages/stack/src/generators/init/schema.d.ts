import { BaseSchema } from '@nxpm/common'

export interface InitGeneratorSchema extends BaseSchema {
  apiName?: string
  mobileName?: string
  webName?: string
}
