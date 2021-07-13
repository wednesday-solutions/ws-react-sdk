const path = require('path');
const dotenv = require('dotenv');
const url = require('rollup-plugin-url');
const json = require('@rollup/plugin-json');
const babel = require('@rollup/plugin-babel').default;
const alias = require('@rollup/plugin-alias');
const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const analyze = require('rollup-plugin-analyzer');
const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const injectProcessEnv = require('rollup-plugin-inject-process-env');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const pkg = require('../package.json');

const intitializeEnvKeys = () => {
  try {
    const dotEnvFile = process.env.ENV_NAME === 'production' ? `.env` : `.env.${process.env.ENV_NAME}`;

    const env = dotenv.config({ path: dotEnvFile }).parsed;

    const envKeys = Object.keys(env || {}).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
    envKeys.NODE_ENV = process.env.BUILD;
    return envKeys;
  } catch (e) {
    throw new Error(e.message);
  }
};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/es/index.js',
      esModule: true
    }
  ],
  treeshake: 'smallest',
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    alias({
      entries: [
        { find: '@src', replacement: path.resolve(__dirname, '../src') },
        { find: '@services', replacement: path.resolve(__dirname, '../src/services') },
        { find: '@selectors', replacement: path.resolve(__dirname, '../src/selectors') },
        { find: '@reducers', replacement: path.resolve(__dirname, '../src/reducers') },
        { find: '@utils', replacement: path.resolve(__dirname, '../src/utils') },
        { find: '@themes', replacement: path.resolve(__dirname, '../src/themes') },
        { find: '@components', replacement: path.resolve(__dirname, '../src/components') },
        { find: '@images', replacement: path.resolve(__dirname, '../src/images') }
      ]
    }),
    injectProcessEnv(intitializeEnvKeys()),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    images(),
    json(),
    url(),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use: [
        'sass',
        [
          'less',
          {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#af0974'
            }
          }
        ]
      ]
    }),
    terser(),
    process.env.ENV_NAME === 'development' &&
      analyze({
        summaryOnly: true,
        showExports: true,
        hideDeps: true
      })
  ],
  external: [
    'antd',
    'styled-components',
    'react',
    'react-redux',
    'redux',
    'react-intl',
    'react-is',
    'react-dom',
    'prop-types',
    'react-router',
    '@ctrl/tinycolor',
    '@ant-design/icons',
    '@ant-design/colors',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'formatjs/intl-relativetimeformat',
    'formatjs'
  ]
};

module.exports = config;
