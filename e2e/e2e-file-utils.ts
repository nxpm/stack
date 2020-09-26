import { checkFilesExist, readFile } from '@nrwl/nx-plugin/testing'

type FileContainMap = Record<string, string[]>

export interface FileTests {
  existing?: string[]
  missing?: string[]
  contain?: FileContainMap
}

function testFileMissing(missing: string[]) {
  describe('check missing files', () => {
    for (let file of missing) {
      it(`file: ${file}`, (done) => {
        expect(() => checkFilesExist(file)).toThrow()
        done()
      })
    }
  })
}

function testFileExisting(files: string[]) {
  describe('check existing files', () => {
    for (let file of files) {
      it(`file: ${file}`, (done) => {
        expect(() => checkFilesExist(file)).not.toThrow()
        done()
      })
    }
  })
}

function testFileContents(fileMap: FileContainMap) {
  const files = Object.keys(fileMap)

  describe('check file contents', () => {
    for (let file of files) {
      it(file, (done) => {
        const lines = fileMap[file]
        for (let line of lines) {
          const content = readFile(file)
          expect(content).toContain(line)
        }
        done()
      })
    }
  })
}

export function runFileTests(tests: FileTests) {
  if (tests?.existing?.length) {
    testFileExisting(tests.existing)
  }

  if (tests?.missing?.length) {
    testFileMissing(tests.missing)
  }

  if (Object.keys(tests.contain)?.length) {
    testFileContents(tests.contain)
  }
}
