import config from './rollup.config.js';

config.input = 'src/components/index.js';
config.output = [
  {
    ...config.output[0],
    file: 'lib/es/components.js'
  }
];
export default config;
