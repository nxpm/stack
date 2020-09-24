import { Rule } from '@angular-devkit/schematics'
import { updateWorkspace } from '@nrwl/workspace'
// import { NormalizedSchema } from '../schemas/normalized-schema'
// import { addTargetsToProject, createRunCommand } from '../utils'
//
// /**
//  * Add run scripts for the prisma cli
//  * @param {NormalizedSchema} options
//  * @returns {Rule}
//  */
// export function addPrismaScripts(options: NormalizedSchema): Rule {
//   return updateWorkspace((workspace) => {
//     const project = workspace.projects.get(options.projectName)
//
//     // Location to the generated Prisma file
//     const prismaFile = `${options.projectRoot}/src/prisma/schema.prisma`
//
//     // Wrapper to run a Prisma command
//     const prisma = (cmd: string) => {
//       const append = cmd.startsWith('migrate') ? '--experimental --create-db' : ''
//
//       return `npx prisma ${cmd} ${append} --schema ${prismaFile} `
//     }
//
//     addTargetsToProject(project, [
//       createRunCommand('generate', prisma('generate')),
//       createRunCommand('migrate-save', prisma('migrate save --name init')),
//       createRunCommand('migrate-up', prisma('migrate up')),
//       createRunCommand('init', [
//         `npx nx run ${options.projectName}:migrate-save`,
//         `npx nx run ${options.projectName}:migrate-up`,
//         `npx nx run ${options.projectName}:generate`,
//       ]),
//     ])
//   })
// }
