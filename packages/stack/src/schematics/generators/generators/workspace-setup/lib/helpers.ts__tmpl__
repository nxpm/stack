import { yellow } from '@nestjs/common/utils/cli-colors.util'
import { bold, gray, greenBright, inverse, magentaBright } from 'chalk'
import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'
import { Client } from 'pg'

export const MAX_RETRIES = 30
export const WORKSPACE_NAME = basename(process.cwd())
export const DATABASE_URL = process.env.DATABASE_URL

export function log(...msg) {
  console.log(magentaBright('>'), inverse(magentaBright(bold(` NXPM `))), gray(`${WORKSPACE_NAME}`), ...msg)
}

export async function connectToPostgres(url: string): Promise<Client> {
  const client = new Client(url)
  await client.connect()
  return client
}

export async function canConnect(url: string): Promise<boolean> {
  try {
    await connectToPostgres(url)
    log(greenBright('Connected to Postgres'))
    return true
  } catch (e) {
    return false
  }
}

export function ensureDockerIsRunning() {
  try {
    execSync('docker ps', { stdio: 'ignore' })
    log(greenBright('Docker is Up'))
    return true
  } catch (e) {
    throw new Error(`Make sure Docker is running`)
  }
}

export function isDockerComposeRunning(): boolean {
  try {
    const res = execSync('docker-compose top', {
      stdio: ['inherit', 'inherit'],
    })

    if (res) {
      log(greenBright('Docker Compose is Running'))
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

export async function ensureDockerComposeIsRunning() {
  const isRunning = await isDockerComposeRunning()
  if (isRunning) {
    return true
  }

  try {
    execSync('docker-compose up -d', { stdio: 'ignore' })
    await waitForConnection()
    log(greenBright('Docker Compose Started'))
  } catch (e) {
    throw new Error(`Make sure Docker Compose is running`)
  }
}

export function ensureDotEnv() {
  // TODO: This method should verify if all values from .env.example exist in .env
  try {
    if (!existsSync('.env')) {
      writeFileSync('.env', readFileSync('.env.example'))
      log(greenBright('.env created (copied from .env.example)'))
    } else {
      log(greenBright('.env exists'))
    }
  } catch (e) {
    throw new Error(`Make sure Docker Compose is running`)
  }
}

export function runPrismaSetup() {
  try {
    execSync('yarn prisma:db-push', { stdio: 'ignore' })
    log(greenBright('Prisma Setup is Done'))
    return true
  } catch (e) {
    throw new Error(`There was an issue running 'yarn prisma:db-push'`)
  }
}

export function runPrismaSeed() {
  try {
    execSync('yarn prisma:seed --confirm --timeout 0', { stdio: 'ignore' })
    log(greenBright('Prisma Seed is Done'))
    return true
  } catch (e) {
    throw new Error(`There was an issue running 'yarn prisma:seed'`)
  }
}

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForConnection(): Promise<any> {
  log(yellow('Waiting for Postgres to connect'))
  return new Promise(async (resolve, reject) => {
    let count = 0
    let connected = false

    while (!connected && count < MAX_RETRIES) {
      connected = await canConnect(DATABASE_URL)
      await sleep()
      count++
    }

    if (connected) {
      return resolve()
    }
    return reject()
  })
}
