import { Injectable, OnModuleInit } from '@nestjs/common'
import { readJsonSync } from 'fs-extra'
import { join } from 'path'
import { Logger } from '../../logger'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class DevServerProjectService implements OnModuleInit {
  private readonly logger = new Logger('DevServerWatcherService')
  private nxJson: any
  private workspaceJson: any
  projects = []

  private readonly apps = new BehaviorSubject<any[]>([])
  readonly apps$ = this.apps.asObservable()

  onModuleInit(): any {
    this.loadProjects()
  }

  loadProjects(): void {
    this.logger.log('Loaded project')
    this.workspaceJson = readJsonSync(join(process.cwd(), 'workspace.json'))
    this.nxJson = readJsonSync(join(process.cwd(), 'nx.json'))
    this.projects = [
      ...Object.keys(this.workspaceJson.projects).map((name) => ({
        name,
        ...this.workspaceJson.projects[name],
      })),
    ]
    this.apps.next(this.listApps())
  }

  listApps() {
    return this.projects
      .filter((project) => project.projectType === 'application')
      .filter((project) => !project.name.endsWith('-e2e'))
  }

  listLibs() {
    return this.projects.filter((project) => project.projectType === 'library')
  }
}
