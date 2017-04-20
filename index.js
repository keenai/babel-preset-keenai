const path = require('path');
const environment = process.env.NODE_ENV || 'development';

module.exports = function(context, options = {}) {
  const modules = (
    options.modules !== undefined ? options.modules : 'commonjs'
  );

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
    ],
  };

  if (process.env.NODE_ENV === 'development') {
    config.plugins.push([
      'react-hot-loader/babel',
      'transform-react-jsx-self',
      'transform-react-jsx-source',
    ]);
  }

  if (process.env.NODE_ENV === 'test') {
    config.plugins.push([
      'dynamic-import-node',
      'transform-es2015-modules-commonjs',
      'transform-react-jsx-self',
      'transform-react-jsx-source',
    ]);
  }

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push([
      'transform-react-constant-elements',
      'transform-react-inline-elements',
      'transform-react-remove-prop-types',
    ]);
  }

  return config;
}
