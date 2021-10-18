import { readProjectConfiguration, Tree, updateJson } from '@nrwl/devkit'

export function setServePort(host: Tree, projectName: string, port: number) {
  const projectConfig = readProjectConfiguration(host, projectName)

  if (projectConfig?.targets?.serve?.options) {
    updateJson(host, 'workspace.json', (json) => {
      projectConfig.targets.serve.options.port = port
      json.projects[projectName] = projectConfig
      return json
    })
  }
}
