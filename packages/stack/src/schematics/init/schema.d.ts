export interface InitSchematicSchema {
  mobileName?: string
  name: string
  ci?: 'github' | 'none'
  webStyleLibrary?: 'bootstrap' | 'tailwind'
  tags?: string
  directory?: string
}
