/* eslint-env node */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.css',
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
                    [
                        'css?modules&importLoaders=1&localIdentName=[local]',
                        'postcss'
                    ],
                    {filename: 'gestalt.css'}
                )
            }
        ],
    },
    postcss: function(webpack) {
        return [
            require('postcss-import')({addDependencyTo: webpack}),
            require('postcss-cssnext')({
                features: {
                    customMedia: {
                        extensions: require('./src/breakpoints')
                    }
                }
            })
        ];
    },
    plugins: [
        new ExtractTextPlugin('gestalt.css'),
    ]
};
