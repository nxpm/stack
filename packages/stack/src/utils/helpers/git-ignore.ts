import { Rule, Tree } from '@angular-devkit/schematics'
import { appendToPath } from '../index'

export const GIT_IGNORE = '.gitignore'

/**
 * Append `lines` to an existing .gitignore file
 * @param {string | string[]} lines
 * @returns {Rule}
 */
export function appendGitIgnore(lines: string | string[]): Rule {
  const content = Array.isArray(lines) ? lines : [lines]

  return (tree: Tree) => {
    const gitIgnore = tree.read(GIT_IGNORE)

    return appendToPath(
      GIT_IGNORE,
      content.filter((line) => !gitIgnore?.includes(line)),
    )
  }
}
