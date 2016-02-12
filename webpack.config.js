module.exports = {
    entry: {
        gridExample: './examples/Grid/example.js',
        modalExample: './examples/Modal/example.js',
    },
    output: {
        filename: '[name].entry.js',
        publicPath: 'http://localhost:8090/assets',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
