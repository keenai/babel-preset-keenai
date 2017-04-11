const merge = require('lodash/merge');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';

const config = {
  plugins: [
    'styled-components',
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
    'env',
    'react',
  ],
};

if (environment === 'development' || environment === 'test') {
  config.plugins.push([
    'react-hot-loader/babel',
    'transform-react-jsx-source',
    'transform-react-jsx-self',
  ]);
}

module.exports = function(context, options) {
  return merge(config, options);
}
