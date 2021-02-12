import { bold, cyanBright, inverse, magentaBright, white } from 'chalk'
import { bootstrap } from '../dev-server/main'
import { INestApplication } from '@nestjs/common'
import { Logger } from '../dev-server/logger'

function log(...msg) {
  console.log(magentaBright('>'), inverse(magentaBright(bold(` NXPM `))), ...msg)
}

function info(message: string) {
  log(inverse(cyanBright(bold(` INFO `))), white(message))
}

export async function workspaceDev({ port }: { port: number }) {
  const restartHandler = async (app: INestApplication) => {
    if (app) {
      await app.close()
    }
    Logger.log('Restarting...')
    setTimeout(async () => {
      await run()
    }, 500)
  }

  async function run() {
    console.clear()
    await bootstrap(port, restartHandler).then(() => {})
  }

  await run()
}
