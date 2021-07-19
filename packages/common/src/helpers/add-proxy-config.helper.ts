import { readProjectConfiguration, Tree, updateJson } from '@nrwl/devkit'

function proxyConfigTemplate(): string {
  return [
    `const dotenv = require('dotenv')`,
    `dotenv.config()`,
    ``,
    `const PORT = process.env.PORT || 3000`,
    `const HOST = process.env.HOST || 'localhost'`,
    'const target = `http://${HOST}:${PORT}`',
    `module.exports = {`,
    `  '/api': { target, secure: false },`,
    `  '/graphql': { target, secure: false, ws: true },`,
    `}`,
  ].join('\n')
}

export function addProxyConfig(host: Tree, projectName: string) {
  const contents = proxyConfigTemplate()
  const projectConfig = readProjectConfiguration(host, projectName)

  if (projectConfig?.targets?.serve?.options?.proxyConfig) {
    const proxyConfig = `${projectConfig.root}/proxy.conf.js`
    host.write(proxyConfig, contents)

    updateJson(host, 'workspace.json', (json) => {
      projectConfig.targets.serve.options.proxyConfig = proxyConfig
      json.projects[projectName] = projectConfig
      return json
    })
  }
}
