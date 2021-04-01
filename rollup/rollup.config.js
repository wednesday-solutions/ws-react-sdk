import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import images from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import pkg from '../package.json';
const path = require('path');
const dotenv = require('dotenv');
const dotEnvFile = process.env.ENV_NAME === 'production' ? `.env` : `.env.${process.env.ENV_NAME}`;
const env = dotenv.config({ path: dotEnvFile }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
envKeys.NODE_ENV = process.env.BUILD;
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/es/index.js',
      preserveModules: false,
      format: 'esm',
      sourcemap: true
    }
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

    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'formatjs/intl-relativetimeformat',
    'formatjs'
  ],
  plugins: [
    images(),
    peerDepsExternal(),
    url(),
    terser(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: /\**node_modules\**/
    }),
    commonjs({
      include: /\**node_modules\**/
    }),
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
    injectProcessEnv(envKeys),
    json()
  ]
};
