import { Tree, writeJson } from '@nrwl/devkit'
import { NormalizedSchema } from '../interfaces'

export function writeNxpmConfigHelper(host: Tree, options: NormalizedSchema) {
  const api = !options.skipApi && {
    name: options.appNameApi,
    type: options.appTypeApi,
  }
  const mobile = !options.skipMobile && {
    name: options.appNameMobile,
    type: options.appTypeMobile,
  }
  const web = !options.skipWeb && {
    name: options.appNameWeb,
    type: options.appTypeWeb,
  }
  writeJson(host, 'nxpm.json', {
    projects: { api, mobile, web },
  })
}
