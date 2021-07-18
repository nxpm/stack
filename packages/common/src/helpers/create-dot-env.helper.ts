import { Tree } from '@nrwl/devkit'
import { appendGitIgnore } from './append-git-ignore.helper'
import { createOrOverwrite } from './create-or-overwrite.helper'

export const DOT_ENV = '.env'
export const DOT_ENV_EXAMPLE = `${DOT_ENV}.example`

/**
 * Creates a new .env and .env.example with `lines` content, and adds the .env to gitignore
 * @param {Tree} host
 * @param {string[]} lines
 */
export function createDotEnv(host: Tree, lines: string[]) {
  createOrOverwrite(host, DOT_ENV, lines)
  createOrOverwrite(host, DOT_ENV_EXAMPLE, lines)
  appendGitIgnore(host, DOT_ENV)
}
