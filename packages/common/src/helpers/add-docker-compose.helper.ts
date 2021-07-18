import { Tree } from '@nrwl/devkit'
import { stringify } from 'yaml'

export function addDockerCompose(host: Tree) {
  const file = 'docker-compose.yml'
  const structure = {
    version: '3',
    services: {
      postgres: {
        image: 'postgres',
        ports: ['5432:5432'],
        environment: {
          POSTGRES_DB: 'prisma',
          POSTGRES_USER: 'prisma',
          POSTGRES_PASSWORD: 'prisma',
        },
        volumes: ['./tmp/postgres:/var/lib/postgresql/data'],
      },
    },
  }
  if (!host.exists(file)) {
    host.write(file, stringify(structure))
  }
}
