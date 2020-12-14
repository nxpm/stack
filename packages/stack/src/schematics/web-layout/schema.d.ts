export interface WebLayoutSchematicSchema {
  appName: string
  name: string
  tags?: string
  library?: 'bootstrap' | 'tailwind'
  directory?: string
  removeArchitects?: boolean
}
