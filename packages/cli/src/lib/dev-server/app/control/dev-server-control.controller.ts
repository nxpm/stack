import { Controller, Get, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DevServerApp } from '../../dev-server-app'

@Controller('control')
export class DevServerControlController implements OnModuleDestroy, OnModuleInit {
  logger = new Logger('DevServerControlController')

  onModuleInit(): any {
    this.logger.log('Starting controller')
  }

  onModuleDestroy(): any {
    this.logger.log('Stopping controller')
  }

  @Get('restart')
  restart() {
    DevServerApp.handler(DevServerApp.app)
  }

  @Get('shutdown')
  shutdown() {
    DevServerApp.app.close().then(() => {
      console.log('done')
    })
  }
}
