import { BaseSchema } from '@nxpm/common'

export type WebUiLibrary = 'tailwind'

export interface WebUiGeneratorSchema extends BaseSchema {
  name: string
  library: WebUiLibrary
}
