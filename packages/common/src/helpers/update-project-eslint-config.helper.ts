import { readJson, readProjectConfiguration, Tree, writeJson } from '@nrwl/devkit'

export function updateProjectEslintConfig(host: Tree, projectName: string, config: Record<string, unknown>) {
  const project = readProjectConfiguration(host, projectName)
  const eslintPath = `${project.root}/.eslintrc.json`
  const eslintConfig = readJson(host, eslintPath)
  writeJson(host, eslintPath, { ...eslintConfig, ...config })
}
