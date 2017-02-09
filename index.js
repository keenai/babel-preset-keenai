module.exports = {
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
      polyfill: true,
      regenerator: true
    }],
  ],

  presets: [
    'es2015',
    'es2016',
    'react',
  ],
};
