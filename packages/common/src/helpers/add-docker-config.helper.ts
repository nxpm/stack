import { Tree } from '@nrwl/devkit'

export function addDockerfile(host: Tree) {
  const file = 'Dockerfile'
  const contents = [
    'FROM node:14-alpine',
    '',
    'WORKDIR /workspace',
    '',
    'COPY package.json yarn.lock /workspace/',
    '',
    'RUN yarn',
    '',
    'COPY . .',
    '',
    'RUN yarn build',
    '',
    'CMD ["yarn", "start"]',
  ].join('\n')
  if (!host.exists(file)) {
    host.write(file, contents)
  }
}

export function addDockerIgnore(host: Tree) {
  const file = '.dockerignore'
  const contents = ['dist', 'node_modules'].join('\n')
  if (!host.exists(file)) {
    host.write(file, contents)
  }
}
