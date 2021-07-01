import config from './rollup.config.js';

config.input = 'src/utils/index.js';
config.output = [
  {
    ...config.output[0],
    ...config.output[1],
    file: 'lib/es/utils/index.js'
  }
];
export default config;
