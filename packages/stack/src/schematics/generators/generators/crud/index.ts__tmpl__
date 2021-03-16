import { Tree } from '@nrwl/devkit'
import { execSync } from 'child_process'

const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
function run(command) {
  console.log(`Running command: ${command}`)
  execSync(command, { stdio: 'inherit' })
}

export default async function (
  host: Tree,
  { model, nameField, plural }: { model: string; nameField: string; plural: string },
) {
  run(`nx g @nxpm/stack:api-crud ${model} --plural ${plural} --nameField ${nameField}`)
  run(`yarn prisma:apply`)

  console.log('Please restart the API, will continue in 10 seconds...')
  await sleep(10)

  run(`nx g @nxpm/stack:web-crud ${model} --plural ${plural} --nameField ${nameField}`)
  run(`yarn build:sdk`)
}
