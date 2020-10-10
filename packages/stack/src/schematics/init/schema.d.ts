export interface InitSchematicSchema {
  name: string
  ci?: 'github' | 'none'
  tags?: string
  directory?: string
}
