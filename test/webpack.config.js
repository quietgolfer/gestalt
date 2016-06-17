const breakpoints = require('../src/breakpoints');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssNext = require('postcss-cssnext');

module.exports = {
  entry: [
    './views/main.js',
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel',
      },
    ],
  },
  postcss(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssUrl(),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
    ];
  },
};
