import { PrismaClient } from '@prisma/client'
import { Schema } from '../schema'
export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

export class Seeder {
  private prisma: PrismaClient

  constructor(private readonly schema: Schema) {
    if (process.env.DATABASE_URL) {
      this.prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })
      console.log(`Connected to ${process.env.DATABASE_URL}`)
    } else {
      console.warn(`Please provide DATABASE_URL`)
    }
  }

  async createData(model: string, collection: any[], include?) {
    return Promise.all(
      collection.map((data) =>
        this.prisma[model]
          .create({ data, include: include ? include : undefined })
          .then((item) => console.debug(`Created ${model}: ${item.name || item.id}`)),
      ),
    )
  }

  async removeData(models: string[]) {
    if (this.schema?.timeout > 0) {
      console.warn(`🚨 STARTING DATA REMOVAL IN ${this.schema?.timeout} SECONDS!`)
      await sleep(this.schema?.timeout * 1000)
    }
    for (const model of models) {
      const deleted = await this.prisma[model].deleteMany()
      console.warn(`Deleted ${deleted.count} ${model}`)
    }
  }
}
