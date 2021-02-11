import { BaseSchema } from '../../utils'

export interface WebUiSchematicSchema extends BaseSchema {
  buildable?: boolean
  prefix?: string
  style?: 'css' | 'scss'
  publishable?: boolean
}
