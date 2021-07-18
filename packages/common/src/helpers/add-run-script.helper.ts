import { Tree, updateJson } from '@nrwl/devkit'

export function addRunScript(host: Tree, script: string, command: string, force = false) {
  updateJson(host, `package.json`, (json) => {
    if (!json['scripts']) {
      json['scripts'] = {}
    }
    if (!json['scripts'][script] || force) {
      if (json['scripts'][script]) {
        delete json['scripts'][script]
      }
      json['scripts'] = {
        [script]: command,
        ...json['scripts'],
      }
    }
    return json
  })
}
