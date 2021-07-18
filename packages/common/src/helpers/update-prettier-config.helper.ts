import { Tree } from '@nrwl/devkit'

export function updatePrettierConfig(host: Tree) {
  const prettierIgnore = '.prettierignore'
  const prettierIgnoreContent = ['package.json', 'dist', 'coverage', 'tmp'].join('\n')
  const prettierRc = '.prettierrc'
  const prettierRcContent = JSON.stringify(
    {
      singleQuote: true,
      printWidth: 120,
      semi: false,
      trailingComma: 'all',
      arrowParens: 'always',
    },
    null,
    2,
  )

  host.write(prettierIgnore, prettierIgnoreContent)
  host.write(prettierRc, prettierRcContent)
}
