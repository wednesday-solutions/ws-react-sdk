const DelegateRollUp = require('../delegator');

const fs = require('fs');
const path = require('path');

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');

  const readdirSync = jest.fn().mockReturnValue([]);
  return {
    ...actual,
    readdirSync
  };
});

const TestSubDir1 = 'subdir1';
// const TestSubDir2 = 'subdir2';
const TestSubDirModules = ['utils'];
const projectRootPath = path.resolve(__dirname, '../../');

const getTestSubDir = dir => path.resolve(projectRootPath, `src/${dir}`);
const handleError = (err, data) => {
  if (err) {
    console.error(err);
  }
};
const createModuleFolders = (dir, dirModule) =>
  fs.writeFileSync(`${getTestSubDir(dir)}/${dirModule}.js`, `${dirModule}contents`);
const createTestFiles = (dir, dirModules = []) => {
  const fs = require('fs');
  fs.mkdir(getTestSubDir(dir), handleError);
  dirModules.forEach(dirModule => createModuleFolders(dir, dirModule));
};

const deleteTestFiles = dir => {
  const fs = require('fs');
  fs.rmdir(getTestSubDir(dir), { recursive: true }, handleError);
};

describe('rollup.delegator', () => {
  it('should not have a roll method if DelegateRollUp is invoked without a directory', () => {
    const RollNothing = new DelegateRollUp();
    expect(RollNothing).toBeInstanceOf(DelegateRollUp);
    expect(RollNothing.roll).toBeUndefined();
  });

  it('should set the directory modules', async () => {
    createTestFiles(TestSubDir1, TestSubDirModules);
    const RollSubDir1 = new DelegateRollUp(TestSubDir1);
    await expect(fs.readdirSync).toHaveBeenCalledWith(getTestSubDir(TestSubDir1), { withFileTypes: true });
    deleteTestFiles(TestSubDir1);
    expect(RollSubDir1.dirModules).toEqual([]);
  });
});
