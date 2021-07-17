import { AppTypeApi, AppTypeMobile, AppTypeWeb } from './app-types'

export interface BaseSchema {
  apiName?: string
  apiType?: AppTypeApi
  mobileName?: string
  mobileType?: AppTypeMobile
  webName?: string
  webType?: AppTypeWeb
  skipApi?: boolean
  skipMobile?: boolean
  skipWeb?: boolean
  name: string
  tags?: string
  directory?: string
}
