var webpack = require('webpack');

module.exports = {
    entry:  {
        main: __dirname + '/js/main.jsx'
    },
    output: {
        path: __dirname + '/public/js',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            }
        ]
    },

    node: {
        fs: 'empty'
    },

    devtool: 'source-map',

    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise'
        })
    ]
}
