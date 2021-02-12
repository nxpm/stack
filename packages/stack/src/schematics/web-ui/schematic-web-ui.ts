import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, createProjectName, getPluginConfig, normalizeOptions } from '../../utils'
import { WebUiSchematicSchema } from './schema'
import { strings } from '@angular-devkit/core'

export default function (options: WebUiSchematicSchema): Rule {
  const plugin = getPluginConfig(options)
  const type = 'ui'
  const directory = options.directory || strings.dasherize(plugin.webAppName)
  const name = createProjectName(options.name, type, true)
  const style = options.style || 'css'

  const normalizedOptions = normalizeOptions<WebUiSchematicSchema>({ ...options, directory, name }, ProjectType.Library)
  const templateOptions = {
    name: options.name,
    prefix: options.prefix || 'ui',
  }

  return chain([
    externalSchematic('@nrwl/angular', 'library', {
      ...templateOptions,
      directory: `${normalizedOptions.directory}/${type}`,
      tags: `scope:${directory},type:${type}`,
      style,
      buildable: options.buildable || false,
      publishable: options.publishable || false,
      routing: true,
      lazy: true,
      linter: 'eslint',
    }),
    addFiles({ ...normalizedOptions, ...templateOptions }),
  ])
}
