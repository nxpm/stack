import { Tree } from '@nrwl/devkit'
import { createOrOverwrite } from './create-or-overwrite.helper'

export const GIT_IGNORE = '.gitignore'

/**
 * Append `lines` to an existing .gitignore file
 * @param {Tree} host
 * @param {string | string[]} lines
 */
export function appendGitIgnore(host: Tree, lines: string | string[]) {
  const content = Array.isArray(lines) ? lines : [lines]

  const gitIgnore = host.read(GIT_IGNORE)
  createOrOverwrite(
    host,
    GIT_IGNORE,
    content.filter((line) => !gitIgnore?.includes(line)),
  )
}
