import { BaseSchema } from '@nxpm/common'

export interface ApiCrudGeneratorSchema extends BaseSchema {
  model?: string
  plural?: string
  nameField?: string
}
