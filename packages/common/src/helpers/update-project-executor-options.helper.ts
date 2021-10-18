import { readProjectConfiguration, TargetConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit'

export function updateAppAssets(
  host: Tree,
  projectName: string,
  assets: { glob: string; input: string; output: string }[] = [],
) {
  return updateProjectExecutorOptions(host, projectName, 'build', 'options', 'assets', assets)
}

export function updateAppStyles(host: Tree, projectName: string, styles: string[] = []) {
  return updateProjectExecutorOptions(host, projectName, 'build', 'options', 'styles', styles)
}

export function updateAppFileReplacements(
  host: Tree,
  projectName: string,
  fileReplacements: { replace: string; with: string }[] = [],
) {
  const project = readProjectConfiguration(host, projectName)
  project.targets = {
    ...project.targets,
    build: {
      ...project.targets.build,
      configurations: {
        ...project.targets.build.configurations,
        production: {
          ...project.targets.build.configurations.production,
          fileReplacements,
        },
      },
    },
  }
  updateProjectConfiguration(host, projectName, project)
}

export function updateProjectExecutorOptions(
  host: Tree,
  projectName: string,
  executor: string,
  section: string,
  key: string,
  options: any,
) {
  const project = readProjectConfiguration(host, projectName)
  project.targets = {
    ...project.targets,
    [executor]: {
      ...project.targets[executor],
      [section]: {
        ...project.targets[executor][section],
        [key]: options,
      },
    },
  }
  updateProjectConfiguration(host, projectName, project)
}

export function updateProjectTargets(
  host: Tree,
  projectName: string,
  targets: { [targetName: string]: TargetConfiguration } = {},
) {
  const project = readProjectConfiguration(host, projectName)
  project.targets = targets
  updateProjectConfiguration(host, projectName, project)
}
