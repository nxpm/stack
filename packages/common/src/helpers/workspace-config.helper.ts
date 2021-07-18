import { Tree } from '@nrwl/devkit'
import { NormalizedSchema } from '../interfaces'
import { addDockerfile, addDockerIgnore } from './add-docker-config.helper'
import { addDockerCompose } from './add-docker-compose.helper'
import { updatePrettierConfig } from './update-prettier-config.helper'
import { addRunScript } from './add-run-script.helper'
import { writeNxpmConfigHelper } from './write-nxpm-config.helper'
import { formatPackageJson } from './format-package-json.helper'
import { removeFiles } from './remove-files.helper'
import { addFiles } from './add-files.helper'

export function workspaceConfig(host: Tree, options: NormalizedSchema, srcFolder: string) {
  // Configure Workspace
  addDockerfile(host)
  addDockerIgnore(host)
  addDockerCompose(host)
  updatePrettierConfig(host)

  // Main run scripts
  addRunScript(
    host,
    'build',
    `yarn build:${options.appNameWeb} && yarn prisma:generate && yarn build:${options.appNameApi}`,
    true,
  )
  addRunScript(host, 'dev:services', `docker-compose up`, true)
  addRunScript(host, 'docker:push', `docker push ${options.npmScope}/${options.appNameApi}`, true)
  addRunScript(host, 'docker:run', `docker run -it -p 8000:3000 ${options.npmScope}/${options.appNameApi}`, true)
  addRunScript(host, 'docker:build', `docker build . -t ${options.npmScope}/${options.appNameApi}`, true)
  addRunScript(host, `setup`, `yarn nx workspace-generator workspace-setup`)
  addRunScript(host, 'start', 'yarn prisma:db-push && node dist/apps/api/main.js', true)
  addRunScript(host, 'test:ci', `yarn prisma:apply && yarn e2e api-e2e`, true)

  writeNxpmConfigHelper(host, options)

  // Format files
  formatPackageJson(host)

  // Remove obsolete files
  removeFiles(host, [`apps/.gitkeep`, `libs/.gitkeep`, 'README.md'])

  // Add workspace files
  addFiles(host, options, srcFolder)
}
