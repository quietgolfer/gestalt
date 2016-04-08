module.exports = {
    entry: [
        'devcards/main',
        './docs/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css?modules&importLoaders=1!postcss'
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
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')()
        ];
    }
};
