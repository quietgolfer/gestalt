/* eslint-env node */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const breakpoints = require('./packages/gestalt/breakpoints');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');


module.exports = {
  entry: './styles.css',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]!postcss'
        ),
      },
    ],
  },
  postcss(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
    ];
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
  ],
};
