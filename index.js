const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const defaults = {
  debug: false,
  loose: false,
  modules: 'commonjs',
  targets: {},
  useBuiltIns: true,
};

module.exports = function(context, opts = {}) {
  const options = Object.assign({}, defaults, opts);

  const config = {
    plugins: [
      'syntax-dynamic-import',
      'transform-class-properties',
      'transform-export-extensions',
      ['transform-object-rest-spread', {
        useBuiltIns: options.useBuiltIns,
      }],
    ],

    presets: [
      ['env', options],
      'flow',
    ],
  };

  if (environment === 'development') {
    config.plugins.push(
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: path.dirname(require.resolve('babel-runtime/package')),
      }],
    );
  }

  return config;
}
