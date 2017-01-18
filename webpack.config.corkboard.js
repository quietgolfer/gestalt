const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const breakpoints = require('./src/breakpoints');
const webpack = require('webpack');

module.exports = {
  entry: [
    'corkboard/init',
    './.corkboard/index.js',
    'corkboard/start',
    'webpack/hot/only-dev-server',
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],

    // De-dupe module includes for fast development builds
    alias: {
      'classnames/bind': `${__dirname}/node_modules/classnames/bind`,
      corkboard: `${__dirname}/node_modules/corkboard`,
      react: `${__dirname}/node_modules/react`,
      'react-dom': `${__dirname}/node_modules/react-dom`,
    },
  },
  node: {
    // postcss needs to strip this out to compile clientside
    fs: 'empty',
  },
  devServer: {
    hot: true,
    inline: true,
    stats: 'normal',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style',
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
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
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, '.corkboard'),
          path.dirname(require.resolve('corkboard')),
        ],
        exclude: /node_modules\/(?!(corkboard)\/).*/,
      },
    ],
  },
  postcss(wp) {
    return [
      postcssImport({
        addDependencyTo: wp,
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Gestalt',
      inject: true,
    }),
  ],
};
