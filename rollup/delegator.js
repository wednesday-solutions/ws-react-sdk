const { access, writeFileSync, constants, readFile, readdirSync } = require('fs');
const path = require('path');

function DelegateRollUp(dir) {
  if (!dir) {
    return;
  }
  this.dir = dir;
  this.projectRootPath = path.resolve(__dirname, '..');
  this.dirPath = path.resolve(this.projectRootPath, `src/${this.dir}`);
  this.buildEntryPath = path.resolve(this.projectRootPath, 'lib/es/index.js');

  this.setDirModules = function() {
    this.dirModules = readdirSync(this.dirPath, { withFileTypes: true })
      .filter(({ name: dirName }) => !(dirName || []).includes('test'))
      .filter(({ name: dirName }) => !(dirName || []).includes('index'));
  };

  this.getConfig = function() {
    const getModuleEntry = dirModule => {
      const { name: moduleName } = dirModule;
      if (dirModule.isDirectory()) {
        return { [moduleName]: `src/${this.dir}/${moduleName}/index.js` };
      }
      const moduleNameSubExt = moduleName.split('.js')[0];
      return { [moduleNameSubExt]: `src/${this.dir}/${moduleName}` };
    };
    const buildSourceEntryMap = (map, dirModule) => {
      return {
        ...map,
        ...getModuleEntry(dirModule)
      };
    };
    const input = this.dirModules.reduce(buildSourceEntryMap, {});
    const output = {
      esModule: true,
      dir: `lib/es/${dir}/`,
      entryFileNames: '[name]/index.js'
    };
    return { input, output };
  };

  this.createExports = function(data) {
    const exportTemplate = dirModule => {
      const { name: moduleName } = dirModule;
      if (dirModule.isDirectory()) {
        return `export { default as ${moduleName} } from './${this.dir}/${moduleName}'`;
      }
      const moduleNameSubExt = moduleName.split('.js')[0];
      return `export { default as ${moduleNameSubExt} } from './${this.dir}/${moduleNameSubExt}'`;
    };
    const exports = this.dirModules.map(exportTemplate);
    const exportsData = exports.join('\n');
    const combinedData = (data || '') + '\n' + exportsData;
    writeFileSync(this.buildEntryPath, combinedData);
  };

  this.readExports = function() {
    access(this.buildEntryPath, constants.F_OK | constants.W_OK, err => {
      if (err) {
        console.error(`${this.buildEntryPath} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        if (err.code === 'ENOENT') {
          this.createExports();
        }
        return;
      }
      readFile(
        this.buildEntryPath,
        {
          encoding: 'utf8'
        },
        (err, data) => {
          if (err) {
            console.error(err);
          }
          this.createExports(data);
        }
      );
    });
  };

  this.roll = async function() {
    const rollup = require('rollup');
    const config = require('./config.js');
    const { input, output } = this.getConfig();
    async function build() {
      const bundle = await rollup.rollup({ ...config, input });
      await bundle.write(output);
      this.readExports();
      await bundle.close();
    }
    await build.apply(this);
  };

  this.watch = async function() {
    const rollup = require('rollup');
    const config = require('./config.js');
    const { input, output } = this.getConfig();
    const watch = {
      clerarScreen: true
    };
    function watchFiles() {
      const watcher = rollup.watch({ ...config, input, output, watch });
      watcher.on('event', ({ result }) => {
        if (result) {
          result.close();
        }
      });
      // stop watching
      watcher.close();
    }
    watchFiles.apply(this);
  };

  this.setDirModules();
}

module.exports = DelegateRollUp;
