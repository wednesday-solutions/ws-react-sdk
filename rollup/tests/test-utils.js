const fs = require('fs');
const path = require('path');

const projectRootPath = path.resolve(__dirname, '../../');

const getTestSubDir = dir => path.resolve(projectRootPath, `src/${dir}`);
const handleError = (err, data) => {
  if (err) {
    // console.error(err);
  }
};

const createModuleFiles = async (dir, dirModule) => {
  await fs.promises.writeFile(`${getTestSubDir(dir)}/${dirModule}.js`, `${dirModule}contents`);
};

const createModuleFolder = async (dir, dirModule) => {
  await fs.promises.mkdir(`${getTestSubDir(dir)}/${dirModule}`, handleError);
  await fs.promises.writeFile(`${getTestSubDir(dir)}/${dirModule}/index.js`, `${dirModule}contents`);
};
const TEST_MODULE_HANDLERS = {
  FILE: createModuleFiles,
  FOLDER: createModuleFolder
};

const TEST_MODULE_TYPES = {
  FILE: 'FILE',
  FOLDER: 'FOLDER'
};

const createTestFiles = async (dir, dirModules = [], moduleType = TEST_MODULE_HANDLERS[TEST_MODULE_TYPES.FILE]) => {
  const fs = require('fs');
  fs.mkdir(getTestSubDir(dir), handleError);
  const moduleTypeHandler = TEST_MODULE_HANDLERS[moduleType];
  if (!moduleTypeHandler) {
    return;
  }
  await Promise.all(
    dirModules.map(async dirModule => {
      await moduleTypeHandler(dir, dirModule);
    })
  );
};

const deleteTestFiles = async dir => {
  const fs = require('fs');
  await fs.promises.rm(
    getTestSubDir(dir),
    { recursive: true, force: true, maxRetries: 20, retryDelay: 200 },
    handleError
  );
};

module.exports = {
  createTestFiles,
  deleteTestFiles,
  TEST_MODULE_TYPES
};
