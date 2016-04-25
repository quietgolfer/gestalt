var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'devcards/main',
        './docs/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
                    'postcss'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!devcards)/,
                loader: 'babel',
            },
        ],
    },
    postcss: function(webpack) {
        return [
            require('postcss-import')({
                addDependencyTo: webpack
            }),
            require('postcss-url')(),
            require('postcss-cssnext')({
                features: {
                    customMedia: {
                        extensions: require('./src/breakpoints')
                    }
                }
            }),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')()
        ];
    },
    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:8080/docs'})
    ]
};
