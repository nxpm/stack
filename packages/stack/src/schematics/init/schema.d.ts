export interface InitSchematicSchema {
  name: string
  ci?: 'github' | 'none'
  webStyleLibrary?: 'bootstrap' | 'tailwind'
  tags?: string
  directory?: string
}
