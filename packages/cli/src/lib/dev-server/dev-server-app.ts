import { INestApplication } from '@nestjs/common'

export class DevServerApp {
  static app: INestApplication
  static handler: (app: INestApplication) => void | Promise<void>
}
