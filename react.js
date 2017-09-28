const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const defaults = {
  intlMessagesDir: './build/messages/',
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
      ['transform-react-jsx', {
        useBuiltIns: options.useBuiltIns,
      }],
    ],

    presets: [
      'react',
    ],
  };

  if (environment === 'development') {
    config.plugins.push(
      'flow-react-proptypes',
      'react-hot-loader/babel',
      'transform-react-jsx-self',
      'transform-react-jsx-source',
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
