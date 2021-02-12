import { Module } from '@nestjs/common'
import { DevServerControlModule } from './control/dev-server-control.module'
import { DevServerProjectModule } from './project/dev-server-project.module'

@Module({
  imports: [DevServerControlModule, DevServerProjectModule],
})
export class DevServerAppModule {}
