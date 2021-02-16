import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { WebLayoutSchematicSchema } from './schema'

export default function (options: WebLayoutSchematicSchema): Rule {
  const name = options.name || 'layout'
  const library = options.library || 'tailwind'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('web-lib', {
      directory,
      name,
      type: 'layout',
    }),
    addFiles(normalizedOptions, `./files/${library}`),
    (host: Tree) => {
      if (library === 'bootstrap') {
        return host
      }
      // Patch tailwind because Angular's rushed Tailwind support breaks the world.
      const oldName = 'tailwind.config.js'
      const newName = 'tailwind-patch.config.js'
      const webpack = 'webpack.config.js'
      if (host.exists(oldName) && host.exists(webpack)) {
        host.create(newName, host.read(oldName))
        host.delete(oldName)
        host.overwrite(webpack, host.read(webpack).toString().replace(oldName, newName))
      }
      return host
    },
  ])
}
