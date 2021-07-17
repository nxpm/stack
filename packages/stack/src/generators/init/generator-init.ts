import { Tree } from '@nrwl/devkit'
import { normalizeOptions } from '../../helpers'
import { InitGeneratorSchema } from './schema'

export async function generatorInit(host: Tree, options: InitGeneratorSchema) {
  const normalizedOptions = normalizeOptions<InitGeneratorSchema>(host, options, null)
  console.log({ normalizedOptions })
  // Prepare options
  // Run API
  // Run Mobile
  // Run Web
  // Configure Workspace
  // addFiles(host, normalizedOptions, join(__dirname, 'files'))
  // await formatFiles(host)
}
