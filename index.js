const path = require('path');

const environment = process.env.NODE_ENV || 'development';

const config = {
  plugins: [
    'syntax-trailing-function-commas',
    'transform-class-properties',
    ['transform-object-rest-spread', {
      useBuiltIns: true,
    }],
    'transform-flow-strip-types',
    ['transform-react-jsx', {
      useBuiltIns: true,
    }],
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: true,

      // Resolve the Babel runtime relative to the config.
      moduleName: path.dirname(require.resolve('babel-runtime/package')),
    }],
  ],

  presets: [
    'latest',
    'react',
  ],
};

if (environment === 'development' || environment === 'test') {
  config.plugins.push([
    'transform-react-jsx-source',
    'transform-react-jsx-self',
  ]);
}

module.exports = config;
