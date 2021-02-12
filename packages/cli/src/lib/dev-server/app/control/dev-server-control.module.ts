import { Module } from '@nestjs/common'
import { DevServerControlService } from './dev-server-control.service'
import { DevServerControlController } from './dev-server-control.controller'

@Module({
  imports: [],
  controllers: [DevServerControlController],
  providers: [DevServerControlService],
})
export class DevServerControlModule {}
