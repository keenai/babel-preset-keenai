const path = require('path');
const environment = process.env.NODE_ENV || 'development';

module.exports = function(context, options = {}) {
  const intlMessagesDir = (
    options.intlMessagesDir || './build/messages/'
  );

  const modules = (
    options.modules !== undefined ? options.modules : 'commonjs'
  );

  const config = {
    plugins: [
      ['react-intl', {
        messagesDir: intlMessagesDir,
        enforceDescriptions: true,
      }],
      'styled-components',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: path.dirname(require.resolve('babel-runtime/package')),
      }],
    ],

    presets: [
      ['env', {
        modules,
        targets: {
          browsers: [
            '> 5%',
            'last 2 versions',
          ],
          node: true,
        },
      }],
      'react',
      'stage-0',
    ],
  };

  if (process.env.NODE_ENV === 'development') {
    config.plugins.push(
      'flow-react-proptypes',
      'react-hot-loader/babel',
      'transform-react-jsx-self',
      'transform-react-jsx-source'
    );
  }

  if (process.env.NODE_ENV === 'test') {
    config.plugins.push(
      'syntax-dynamic-import',
      'transform-es2015-modules-commonjs',
      'transform-react-jsx-self',
      'transform-react-jsx-source'
    );
  }

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      'transform-react-remove-prop-types',
      'transform-react-inline-elements',
      'transform-react-constant-elements'
    );
  }

  return config;
}
