import { BaseSchema } from '../../utils'

export interface ApiCrudSchematicSchema extends BaseSchema {
  model?: string
  plural?: string
  nameField?: string
}
