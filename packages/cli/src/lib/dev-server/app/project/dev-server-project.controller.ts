import { Controller, Get, Logger, Param } from '@nestjs/common'
import { DevServerProjectService } from './dev-server-project.service'
import { DevServerWatcherService } from './dev-server-watcher.service'

@Controller('projects')
export class DevServerProjectController {
  logger = new Logger('DevServerProjectController')

  constructor(private readonly service: DevServerProjectService, private readonly watcher: DevServerWatcherService) {}

  @Get('list')
  list() {
    this.logger.log('LIST OF PROJECTS')

    return this.service.projects
  }

  @Get('apps')
  apps() {
    return this.service.listApps()
  }

  @Get('libs')
  libs() {
    return this.service.listLibs()
  }

  @Get('procs')
  procs() {
    return this.watcher.procs.getValue()
  }

  @Get('restart/:name')
  restart(@Param('name') name: string) {
    this.logger.verbose(`Restart: ${name}`)
    this.watcher.restart(name)
    return true
  }
}
