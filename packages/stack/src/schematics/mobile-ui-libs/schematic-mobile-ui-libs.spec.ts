import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebUiLibsSchematicSchema } from './schema'

describe('mobile-ui-libs schematic', () => {
  let appTree: Tree
  const options: WebUiLibsSchematicSchema = { name: 'test', appName: 'mobile' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-ui-libs', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-ui-libs', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read(`libs/test/ui/button/src/lib/test-ui-button.module.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/button/src/lib/test-ui-button.component.ts`).toString()).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/form/src/lib/validators/index.ts`).toString()).toMatchSnapshot()
    expect(
      appTree.read(`libs/test/ui/form/src/lib/validators/ui-form-validators.module.ts`).toString(),
    ).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/form/src/lib/test-ui-form.module.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/form/src/lib/test-ui-form.component.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/form/src/lib/test-ui-form.field.ts`).toString()).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/icon/src/lib/test-ui-icon.module.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/icon/src/lib/test-ui-icon.component.ts`).toString()).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/loader/src/lib/test-ui-loader.module.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/loader/src/lib/test-ui-loader.component.ts`).toString()).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/page/src/lib/test-ui-page.module.ts`).toString()).toMatchSnapshot()
    expect(appTree.read(`libs/test/ui/page/src/lib/test-ui-page.component.ts`).toString()).toMatchSnapshot()

    expect(appTree.read(`libs/test/ui/page-header/src/lib/test-ui-page-header.module.ts`).toString()).toMatchSnapshot()
    expect(
      appTree.read(`libs/test/ui/page-header/src/lib/test-ui-page-header.component.ts`).toString(),
    ).toMatchSnapshot()

    expect(
      appTree.read(`libs/test/ui/sidebar-page/src/lib/test-ui-sidebar-page.module.ts`).toString(),
    ).toMatchSnapshot()
    expect(
      appTree.read(`libs/test/ui/sidebar-page/src/lib/test-ui-sidebar-page.component.ts`).toString(),
    ).toMatchSnapshot()
  })
})
