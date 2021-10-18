export interface MobileStyleSchematicSchema {
  appName: string
  name: string
  tags?: string
  directory?: string
  library?: 'bootstrap' | 'tailwind'
  removeArchitects?: boolean
}
