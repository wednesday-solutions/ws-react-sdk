import config from './rollup.config.js';

config.input = 'src/services/index.js';
config.output = [
  {
    ...config.output[0],
    file: 'lib/es/services/index.js'
  }
];
export default config;
