import { NestFactory } from '@nestjs/core'

import { DevServerAppModule } from './app/dev-server-app.module'
import { INestApplication } from '@nestjs/common'
import { DevServerApp } from './dev-server-app'
import { Logger } from './logger'

export async function bootstrap(port: number, handler: (app: INestApplication) => void): Promise<void> {
  Logger.app = 'NXPM'
  const app = await NestFactory.create(DevServerAppModule, {
    logger: new Logger(),
  })
  DevServerApp.app = app
  DevServerApp.handler = handler

  return app.listen(port).then(() => Logger.verbose(`Dev Server listening on port ${port}`, 'nxpm-stack'))
}
