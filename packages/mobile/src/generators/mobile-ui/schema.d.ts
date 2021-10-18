import { BaseSchema } from '@nxpm/common'

export type MobileUiLibrary = 'tailwind'

export interface MobileUiGeneratorSchema extends BaseSchema {
  name: string
  library: MobileUiLibrary
}
