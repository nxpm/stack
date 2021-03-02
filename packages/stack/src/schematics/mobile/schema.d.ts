import { BaseSchema } from '../../utils'

export interface MobileSchematicSchema extends BaseSchema {
  name: string
  tags?: string
  style?: 'css' | 'scss'
  directory?: string
  styleLibrary?: 'ionic-angular'
}
