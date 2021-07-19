import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { join } from 'path'
import { NormalizedSchema } from '../interfaces'

function tailwindConfigTemplate(): string {
  return [
    `module.exports = {
      mode: process.env.TAILWIND_MODE ? 'jit' : '',
      purge: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
      darkMode: 'class', // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {
        extend: {
          opacity: ['disabled'],
          cursor: ['disabled'],
        },
      },
      plugins: [require('@tailwindcss/forms')],
    }`,
  ].join('\n')
}

export function addTailwindConfig(host: Tree, normalizedOptions: NormalizedSchema) {
  // Write config file
  const contents = tailwindConfigTemplate()
  host.write('tailwind.config.js', contents)

  // Enable Dark Mode
  const app = readProjectConfiguration(host, normalizedOptions.appNameWeb)
  const indexPath = join(app.sourceRoot, 'index.html')
  const indexContent = host.read(indexPath)
  host.write(indexPath, indexContent.toString('utf-8').replace('<body>', '<body class="dark">'))
}
