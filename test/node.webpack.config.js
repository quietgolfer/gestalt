const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcss = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssNext = require('postcss-cssnext');
const breakpoints = require('../packages/gestalt-media-query/breakpoints');

module.exports = {
  output: {
    path: './dist/',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new ExtractTextPlugin('./css/bundle.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
                    'style-loader',
          [
            'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
            'postcss-loader',
          ]
                ),
      },
    ],
  },
  postcss(webpack) {
    return [
      postcss({ addDependencyTo: webpack }),
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
