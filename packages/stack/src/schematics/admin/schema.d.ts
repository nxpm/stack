import { BaseSchema } from '../../utils'

export interface AdminSchematicSchema extends BaseSchema {
  name: string
  tags?: string
  directory?: string
}
