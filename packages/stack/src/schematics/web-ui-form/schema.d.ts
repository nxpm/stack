export interface WebUiFormSchematicSchema {
  appName: string
  name: string
  tags?: string
  library?: 'bootstrap' | 'tailwind'
  directory?: string
}
