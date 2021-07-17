import { readProjectConfiguration, TargetConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit'

export function updateProjectExecutors(
  host: Tree,
  projectName: string,
  config: Record<string, TargetConfiguration> = {},
) {
  const project = readProjectConfiguration(host, projectName)
  project.targets = { ...config }
  updateProjectConfiguration(host, projectName, project)
}
