module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        corejs: '3.6.5',
        useBuiltIns: 'entry'
      }
    ],
    ['@babel/preset-react', { modules: false }]
  ],
  plugins: [
    'lodash',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        ['import', { libraryName: 'antd', style: true }, 'import-antd']
      ]
    },
    dev: {
      plugins: [['import', { libraryName: 'antd', style: true }]]
    },
    development: {
      plugins: [['import', { libraryName: 'antd', style: true }]]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true
          }
        ],
        'dynamic-import-node',
        ['import', { libraryName: 'antd', style: true }]
      ]
    }
  }
};
