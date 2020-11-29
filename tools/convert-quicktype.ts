import { readJson, readJsonSync } from 'fs-extra'
import { getWorkspaceProjects } from './utils/nx-workspace'
import globby from 'globby'
import { InputData, JSONSchemaInput, JSONSchemaStore, quicktype, TypeScriptTargetLanguage } from 'quicktype-core'
import { basename, dirname } from 'path'

function toPascalCase(input: string) {
  const words = input.match(/[a-z]+/gi)
  if (!words) return ''
  return words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    })
    .join('')
}

async function init() {
  const projects = await getWorkspaceProjects(process.cwd())

  const sourceRoots = projects.filter((project) => project.sourceRoot).map((project) => project.sourceRoot)

  const schemaFiles = await globby(sourceRoots, {
    expandDirectories: {
      files: ['schema.json'],
    },
  })
  // console.log('sourceRoots  ', sourceRoots)
  // console.log('schemaFiles', schemaFiles)
  for (const schemaFile of schemaFiles) {
    const schemaInput = new JSONSchemaInput(new JSONSchemaStore())

    const baseDirName = basename(dirname(schemaFile))
    const schemaContent = await readJson(schemaFile)
    const schemaName = toPascalCase(baseDirName) + 'SchematicSchema'
    console.log('schemaFile', schemaFile)
    console.log('  ', schemaName)
    // console.log('  ', )

    const inputData = new InputData()

    await inputData.addSource('schema', schemaContent, () => new JSONSchemaInput(undefined))

    const { lines } = await quicktype({
      lang: new TypeScriptTargetLanguage(),
      inputData,
      alphabetizeProperties: true,
      rendererOptions: {
        'just-types': 'true',
        'explicit-unions': 'true',
        'acronym-style': 'camel',
      },
    })

    console.log({ lines })
  }
}

init()
