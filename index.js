const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const defaults = {
  debug: false,
  loose: false,
  intlMessagesDir: './build/messages/',
  modules: 'commonjs',
  targets: {},
  useBuiltIns: true,
};

module.exports = function(context, opts = {}) {
  const options = Object.assign({}, defaults, opts);

  const config = {
    plugins: [
      ['react-intl', {
        messagesDir: options.intlMessagesDir,
        enforceDescriptions: true,
      }],
      'styled-components',
      'syntax-dynamic-import',
      'transform-class-properties',
      'transform-export-extensions',
      ['transform-object-rest-spread', {
        useBuiltIns: options.useBuiltIns,
      }],
      ['transform-react-jsx', {
        useBuiltIns: options.useBuiltIns,
      }],
    ],

    presets: [
      ['env', options],
      'react',
    ],
  };

  if (environment === 'development') {
    config.plugins.push(
      'flow-react-proptypes',
      'react-hot-loader/babel',
      'transform-react-jsx-self',
      'transform-react-jsx-source',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: path.dirname(require.resolve('babel-runtime/package')),
      }],
    );
  }

  if (environment === 'test') {
    config.plugins.push(
      'transform-react-jsx-self',
      'transform-react-jsx-source'
    );
  }

  if (environment === 'production') {
    config.plugins.push(
      'transform-react-remove-prop-types',
      'transform-react-inline-elements',
      'transform-react-constant-elements'
    );
  }

  return config;
}
