import { WebStyleLibrary } from '../interfaces'

export interface WorkspaceInitOptions {
  allowExisting: boolean
  dryRun: boolean
  tag: string
  name: string
  cli: string
  skipApi?: boolean
  skipMobile?: boolean
  skipWeb?: boolean
  webStyleLibrary: WebStyleLibrary
}
