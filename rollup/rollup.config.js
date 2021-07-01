import path from 'path';
import dotenv from 'dotenv';
import url from 'rollup-plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import images from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
// import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from '../package.json';

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

export default {
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
    // commonjs(),
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
