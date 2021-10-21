import { BaseSchema } from '@nxpm/common'
import { ApiLibType } from '../../helpers'

export interface ApiLibGeneratorSchema extends BaseSchema {
  name: string
  type: ApiLibType
}
