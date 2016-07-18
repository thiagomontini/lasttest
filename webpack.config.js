var webpack = require('webpack');

var plugins = [
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        'Promise': 'imports?this=>global!exports?global.Promise!es6-promise'
    })
];

if (process.env.NODE_ENV=='production') {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ])
}

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
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    node: {
        fs: 'empty'
    },

    devtool: 'source-map',

    plugins: plugins
}
