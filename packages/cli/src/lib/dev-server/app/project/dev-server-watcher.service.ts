import { Injectable, Logger, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DevServerProjectService } from '../project/dev-server-project.service'
import { BehaviorSubject, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ChildProcess, spawn } from 'child_process'

@Injectable()
export class DevServerWatcherService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger('DevServerWatcherService')
  private readonly apps$ = this.project.apps$.pipe(tap((apps) => apps.map((app) => this.startApp(app))))

  readonly procs = new BehaviorSubject<{ [key: string]: ChildProcess }>({})
  readonly procs$ = this.procs.asObservable()
  private sub: Subscription

  constructor(private readonly project: DevServerProjectService) {}

  onModuleInit(): any {
    this.sub = this.apps$.subscribe()
    this.logger.log('Starting watcher')
  }

  onModuleDestroy(): any {
    this.sub.unsubscribe()
    this.logger.log('Stopping watcher')
    return this.procs$.subscribe((procs) => {
      Object.keys(procs).map((p) => {
        this.logger.verbose(`Killing ${p}`)
        return procs[p].kill()
      })
    })
  }

  startApp(app) {
    this.logger.verbose(`Starting app: ${app.name}`)
    const pid = spawn(`./node_modules/.bin/nx`, ['serve', app.name], {
      cwd: process.cwd(),
      detached: true,
      stdio: 'inherit',
    })
    this.procs.next({ ...this.procs.getValue(), [app.name]: pid })
  }

  restart(name: string) {
    const proc = this.procs.getValue()[name]
    if (proc) {
      console.log('Proc Found')
      proc.kill(9)
      // this.startApp()
    } else {
      throw new NotFoundException(`Project ${name} not found`)
    }
  }
}
