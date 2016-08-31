const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const breakpoints = require('./src/breakpoints');

module.exports = {
  devtool: 'source-map',
  entry: [
    'corkboard/init',
    './.corkboard/index.js',
    'corkboard/start',
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: __dirname,
        exclude: 'node_modules',
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.css$/,
        include: path.dirname(require.resolve('corkboard')),
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: 'node_modules',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.dirname(require.resolve('corkboard')),
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
    new HtmlWebpackPlugin({
      title: 'Gestalt',
      inject: true,
    }),
  ],
};
