import { Module } from '@nestjs/common'
import { DevServerProjectService } from './dev-server-project.service'
import { DevServerProjectController } from './dev-server-project.controller'
import { DevServerWatcherService } from './dev-server-watcher.service'

@Module({
  controllers: [DevServerProjectController],
  providers: [DevServerProjectService, DevServerWatcherService],
})
export class DevServerProjectModule {}
