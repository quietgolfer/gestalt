const breakpoints = require('./src/breakpoints');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssNext = require('postcss-cssnext');
const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssReporter = require('postcss-reporter');

module.exports = {
  devtool: 'source-map',
  entry: [
    'devcards/main',
    './docs/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!devcards)/,
        loader: 'babel',
      },
    ],
  },
  postcss(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      postcssUrl(),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
      postcssBrowserReporter(),
      postcssReporter(),
    ];
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080/docs' }),
  ],
};
