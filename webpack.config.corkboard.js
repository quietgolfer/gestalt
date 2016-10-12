const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const breakpoints = require('./packages/pinterest-gestalt/breakpoints');

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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    // postcss needs to strip this out to compile clientside
    fs: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style',
      },
      {
        test: /\.css$/,
        include: __dirname,
        exclude: path.join(__dirname, 'node_modules'),
        loaders: [
          'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.dirname(require.resolve('corkboard')),
        ],
        loaders: [
          'css?importLoaders=1',
          'postcss',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'packages'),
          path.join(__dirname, '.corkboard'),
          path.dirname(require.resolve('corkboard')),
        ],
        exclude: 'node_modules',
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
