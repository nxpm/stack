import { BaseSchema } from '../../interfaces'

export interface InitGeneratorSchema extends BaseSchema {
  apiName?: string
  mobileName?: string
  webName?: string
}
