import { BaseSchema } from '../../utils'

export interface WebSchematicSchema extends BaseSchema {
  name: string
  tags?: string
  style?: 'css' | 'scss'
  directory?: string
  styleLibrary?: 'bootstrap' | 'tailwind'
}
