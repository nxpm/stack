import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
import {
  adminFilesExisting,
  adminFilesRemoved,
  adminProjects,
} from './admin-structure';
import {
  apiFilesExisting,
  apiFilesRemoved,
  apiProjects,
} from './api-structure';

describe('stack e2e', () => {
  it('should initialize a new project', async (done) => {
    const projectNameApi = 'api';
    const projectNameAdmin = uniq('admin');
    ensureNxProject('@nxpm/stack', 'dist/packages/stack');
    await runNxCommandAsync(`generate @nxpm/stack:init ${projectNameAdmin}`);

    const nxJson = readJson('nx.json');

    // Check if all projects are created
    const projectNames = Object.keys(nxJson.projects);

    expect(projectNames).toEqual([
      ...apiProjects(projectNameApi),
      ...adminProjects(projectNameAdmin),
    ]);

    // Make sure expected files exist
    const existingFiles = [
      ...apiFilesExisting(projectNameApi),
      ...adminFilesExisting(projectNameAdmin),
    ];

    for (let file of existingFiles) {
      expect(() => checkFilesExist(file)).not.toThrow();
    }

    // Make sure expected files that don't exist
    const removedFiles = [
      ...apiFilesRemoved(projectNameApi),
      ...adminFilesRemoved(projectNameAdmin),
    ];

    for (let file of removedFiles) {
      expect(() => checkFilesExist(file)).toThrow();
    }

    // Build API
    await runNxCommandAsync(`build ${projectNameApi}`);
    expect(() =>
      checkFilesExist(`dist/apps/${projectNameApi}/main.js`)
    ).not.toThrow();

    // Build Admin
    await runNxCommandAsync(`build ${projectNameAdmin}`);
    expect(() =>
      checkFilesExist(`dist/apps/${projectNameAdmin}/index.html`)
    ).not.toThrow();

    done();
  });
});
