const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
      },
      modules: false,
    },
  ],
];
const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-modules-commonjs',
  ['@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: false,
      helpers: true,
      regenerator: true,
      version: '7.0.0-beta.0',
    },
  ],
];
module.exports = { presets, plugins };