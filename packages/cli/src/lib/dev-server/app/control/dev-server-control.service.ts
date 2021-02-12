import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DevServerControlService implements OnModuleDestroy, OnModuleInit {
  logger = new Logger('DevServerWatcherService')

  onModuleInit(): any {
    this.logger.log('Starting watcher')
  }

  onModuleDestroy(): any {
    this.logger.log('Stopping watcher')
  }
}
