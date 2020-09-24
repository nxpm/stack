import { chain, Rule } from '@angular-devkit/schematics'
import { appendGitIgnore } from './git-ignore'
import { appendToPath, createOrOverwrite } from '../index'

export const DOT_ENV = '.env'
export const DOT_ENV_EXAMPLE = `${DOT_ENV}.example`

/**
 * Creates a new .env and .env.example with `lines` content, and adds the .env to gitignore
 * @param {string[]} lines
 * @returns {Rule}
 */
export function createDotEnv(lines: string[]): Rule {
  return chain([createOrOverwrite(DOT_ENV, lines), createOrOverwrite(DOT_ENV_EXAMPLE, lines), appendGitIgnore(DOT_ENV)])
}

/**
 * Append `lines` to an existing .env and .env.example
 * @param {string[]} lines
 * @returns {Rule}
 */
export function appendDotEnv(lines: string[]): Rule {
  return chain([appendToPath(DOT_ENV, lines), appendToPath(DOT_ENV_EXAMPLE, lines)])
}
