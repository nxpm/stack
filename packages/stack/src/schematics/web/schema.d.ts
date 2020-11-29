import { BaseSchema } from '../../utils'

export interface WebSchematicSchema extends BaseSchema {
  name: string
  tags?: string
  directory?: string
}
