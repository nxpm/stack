import { BaseSchema } from '../../utils'

export interface AdminSchematicSchema extends BaseSchema {
  name: string
  backendProject?: string
  tags?: string
  directory?: string
}
