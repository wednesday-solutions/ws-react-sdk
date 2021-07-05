const DelegateRollUp = require('../delegator');
const { createTestFiles, deleteTestFiles, TEST_MODULE_TYPES } = require('./test-utils');

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return actual;
});

const TestSubDirModules = ['utils', 'sub-dir-module1'];

const cleanTestFiles = async () => {
  await deleteTestFiles('subdir1');
  await deleteTestFiles('subdir2');
  await deleteTestFiles('subdir3');
  await deleteTestFiles('subdir4');
  await deleteTestFiles('subdir5');
  await deleteTestFiles('subdir6');
};

beforeAll(async () => {
  return cleanTestFiles();
});

describe('delegator tests', () => {
  it('should not have a roll method if DelegateRollUp is invoked without a directory', () => {
    const RollNothing = new DelegateRollUp();
    expect(RollNothing).toBeInstanceOf(DelegateRollUp);
    expect(RollNothing.roll).toBeUndefined();
  });
  it('should set the directory modules for module files (eg: src/test-dir/module.js)', async () => {
    await createTestFiles('subdir1', TestSubDirModules, TEST_MODULE_TYPES.FILE);
    const RollSubDir1 = new DelegateRollUp('subdir1');
    expect(RollSubDir1.dirModules[0]).toHaveProperty('name', 'sub-dir-module1.js');
    expect(RollSubDir1.dirModules[1]).toHaveProperty('name', 'utils.js');
    await setTimeout(() => {}, 2000);
    await deleteTestFiles('subdir1');
  });

  it('should set the directory modules for module folders (eg: src/test-dir/module/index.js)', async () => {
    await createTestFiles('subdir2', TestSubDirModules, TEST_MODULE_TYPES.FOLDER);
    const RollSubDir1 = new DelegateRollUp('subdir2');
    expect(RollSubDir1.dirModules[0]).toHaveProperty('name', 'sub-dir-module1');
    expect(RollSubDir1.dirModules[1]).toHaveProperty('name', 'utils');
    await setTimeout(() => {}, 2000);
    await deleteTestFiles('subdir2');
  });

  it('should ignore module files and folders with index/test names', async () => {
    await createTestFiles('subdir3', ['test'], TEST_MODULE_TYPES.FOLDER);
    await createTestFiles('subdir3', ['index'], TEST_MODULE_TYPES.FILE);
    const RollSubDir1 = new DelegateRollUp('subdir3');
    expect(RollSubDir1.dirModules.length).toBe(0);
    await setTimeout(() => {}, 2000);
    await deleteTestFiles('subdir3');
  });

  it('should handle a directory with module folders and files', async () => {
    await createTestFiles('subdir4', TestSubDirModules, TEST_MODULE_TYPES.FOLDER);
    await createTestFiles('subdir4', ['sub-dir-module', 'sub-dir-module2'], TEST_MODULE_TYPES.FILE);
    const RollSubDir1 = new DelegateRollUp('subdir4');
    expect(RollSubDir1.dirModules.length).toBe(4);
    await setTimeout(() => {}, 1000);
    await deleteTestFiles('subdir4');
  });
  it('should correctly build the config for module files', async () => {
    await createTestFiles('subdir5', ['sub-dir-module1', 'sub-dir-module2'], TEST_MODULE_TYPES.FILE);
    const RollSubDir1 = new DelegateRollUp('subdir5');
    expect(RollSubDir1.getConfig()).toEqual({
      input: {
        'sub-dir-module1': 'src/subdir5/sub-dir-module1.js',
        'sub-dir-module2': 'src/subdir5/sub-dir-module2.js'
      },
      output: {
        esModule: true,
        dir: 'lib/es/subdir5/',
        entryFileNames: '[name]/index.js'
      }
    });
    await setTimeout(() => {}, 2000);
    await deleteTestFiles('subdir5');
  });
  it('should correctly build the config for module folders', async () => {
    await createTestFiles('subdir6', ['sub-dir-module1', 'sub-dir-module2'], TEST_MODULE_TYPES.FOLDER);
    const RollSubDir1 = new DelegateRollUp('subdir6');
    expect(RollSubDir1.getConfig()).toEqual({
      input: {
        'sub-dir-module1': 'src/subdir6/sub-dir-module1/index.js',
        'sub-dir-module2': 'src/subdir6/sub-dir-module2/index.js'
      },
      output: {
        esModule: true,
        dir: 'lib/es/subdir6/',
        entryFileNames: '[name]/index.js'
      }
    });
    await setTimeout(() => {}, 2000);
    await deleteTestFiles('subdir6');
  });
});
