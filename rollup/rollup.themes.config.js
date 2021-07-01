import config from './rollup.config.js';

config.input = 'src/themes/index.js';
config.output = [
  {
    ...config.output[0],
    file: 'lib/es/themes/index.js'
  }
];
export default config;
