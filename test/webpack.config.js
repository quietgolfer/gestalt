module.exports = {
    entry: [
        './views/main.js'
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel',
            },
        ],
    },
    postcss: function(webpack) {
        return [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')({
                features: {
                    customMedia: {
                        extensions: require('../src/breakpoints')
                    }
                }
            })
        ];
    },
};
