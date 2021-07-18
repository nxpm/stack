import { readProjectConfiguration, Tree, updateJson } from '@nrwl/devkit'

export function addPrismaConfig(host: Tree, projectName: string) {
  const project = readProjectConfiguration(host, projectName)
  const prismaFile = `${project.sourceRoot}/prisma/schema.prisma`

  updateJson(host, 'package.json', (json) => {
    json.prisma = { schema: prismaFile }
    json.scripts = {
      'prisma:apply': 'yarn prisma:format && yarn prisma:db-push',
      'prisma:db-push': 'yarn prisma db push',
      'prisma:format': 'yarn prisma format',
      'prisma:generate': 'yarn prisma generate',
      'prisma:migrate': 'yarn prisma migrate',
      'prisma:studio': 'yarn prisma studio',
      'prisma:seed': 'yarn nx workspace-generator prisma-seed',
      ...json.scripts,
    }
    return json
  })
}
