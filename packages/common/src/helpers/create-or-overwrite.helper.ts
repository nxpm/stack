import { Tree } from '@nrwl/devkit'

export function lineEnd(content: string) {
  return `${content}\n`
}

export function createOrOverwrite(host: Tree, path, line: string | string[]) {
  const lines = Array.isArray(line) ? line : [line]

  const content = lineEnd(lines.join('\n'))
  host.write(path, content)
}
