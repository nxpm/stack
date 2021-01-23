import { Tree } from '@nrwl/devkit'
import { bold, inverse, magentaBright, gray } from 'chalk'
import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'

const workspaceName = basename(process.cwd())
function log(...msg) {
  console.log(magentaBright('>'), inverse(magentaBright(bold(` NXPM `))), gray(`${workspaceName}`), ...msg)
}

export default async function (host: Tree, schema: any) {
  log('🚀 Setting up workspace ')
  await ensureDockerIsRunning()
  await ensureDockerComposeIsRunning()
  await ensureDotEnv()
  await runPrismaSetup()
  await runPrismaSeed()
  log('🎉 Workspace setup done!')
}

function ensureDockerIsRunning() {
  try {
    execSync('docker ps', { stdio: 'ignore' })
    log('✅ Docker is Up')
    return true
  } catch (e) {
    throw new Error(`Make sure Docker is running`)
  }
}

function ensureDockerComposeIsRunning() {
  try {
    execSync('docker-compose up -d', { stdio: 'ignore' })
    log('✅ Docker Compose is Up')
  } catch (e) {
    throw new Error(`Make sure Docker Compose is running`)
  }
}

function ensureDotEnv() {
  try {
    if (!existsSync('.env')) {
      writeFileSync('.env', readFileSync('.env.example'))
      log('✅ .env created (copied from .env.example)')
    } else {
      log('✅ .env exists')
    }
  } catch (e) {
    throw new Error(`Make sure Docker Compose is running`)
  }
}

function runPrismaSetup() {
  try {
    execSync('yarn prisma:db-push', { stdio: 'ignore' })
    log('✅ Prisma Setup is Done')
    return true
  } catch (e) {
    throw new Error(`There was an issue running 'yarn prisma:apply'`)
  }
}

function runPrismaSeed() {
  try {
    execSync('yarn prisma:seed --confirm --timeout 0', { stdio: 'ignore' })
    log('✅ Prisma Seed is Done')
    return true
  } catch (e) {
    throw new Error(`There was an issue running 'yarn prisma:seed'`)
  }
}
