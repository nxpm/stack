import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { StackSchematicSchema } from './schema';

describe('stack schematic', () => {
  let appTree: Tree;
  const options: StackSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nxpm/stack',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('stack', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
