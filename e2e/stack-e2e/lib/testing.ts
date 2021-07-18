import { dirname, join } from 'path'
import { cleanup, patchPackageJsonForPlugin, runPackageManagerInstall, tmpProjPath } from '@nrwl/nx-plugin/testing'
import { execSync } from 'child_process'
import { ensureDirSync } from 'fs-extra'
import { readJson, readJsonFile, writeJsonFile } from '@nrwl/devkit'

export interface ProjectDistPath {
  package?: string
  path?: string
}

function runNxNewCommand(args?: string, silent?: boolean) {
  const localTmpDir = dirname(tmpProjPath())
  return execSync(
    `node ${require.resolve(
      '@nrwl/tao',
    )} new proj --nx-workspace-root=${localTmpDir} --no-interactive --skip-install --collection=@nrwl/workspace --npmScope=proj --preset=empty ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    },
  )
}

/**
 * Creates a new nx project in the e2e directory
 *
 * @param paths
 */
export function newNxProject(paths: ProjectDistPath[]): void {
  cleanup()
  runNxNewCommand('--package-manager=yarn', true)
  patchDistProjects(paths)
  for (const path of paths) {
    patchPackageJsonForPlugin(path.package, path.path)
  }
  runPackageManagerInstall()
}

function getAbsPath(distPath: string) {
  return join(process.cwd(), distPath)
}

/**
 * Patches the relative links to projects in a  nx project in the e2e directory
 *
 * @param paths
 */
export function patchDistProjects(paths: ProjectDistPath[]): void {
  for (const path of paths) {
    const absDistPath = getAbsPath(path.path)
    const absPackageJson = join(absDistPath, 'package.json')
    const packageJson = readJsonFile(absPackageJson)
    const packageDeps = packageJson?.dependencies || {}
    for (const pkg of paths) {
      const absDistPath = `file:/${getAbsPath(pkg.path)}`
      if (packageDeps[pkg.package] && packageDeps[pkg.package] !== absDistPath) {
        // console.log(` In ${path.package} => Update ${pkg.package} => ${absDistPath}`)
        packageDeps[pkg.package] = absDistPath
      }
    }
    writeJsonFile(absPackageJson, { ...packageJson, dependencies: packageDeps })
  }
}

/**
 * Ensures that a project has been setup in the e2e directory
 * It will also copy `@nrwl` packages to the e2e directory
 */
export function ensureNxProjects(paths: ProjectDistPath[]): void {
  ensureDirSync(tmpProjPath())
  newNxProject(paths)
}
