import { BaseSchema } from '@nxpm/common'
import { WebLibType } from '../../helpers'

export interface WebLibGeneratorSchema extends BaseSchema {
  name: string
  prefix?: string
  type: WebLibType
}
