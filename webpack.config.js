const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: `${__dirname}/src`,

    entry: {
        home: './pages/home/index.js',
        player: './pages/player/index.js',
        style: './style/main.scss',
    },

    output: {
        filename: './js/[name].js',
        path: `${__dirname}/dist`,
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js'],
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?sourceMap'],
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'resolve-url-loader',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Player Stats',
            filename: './index.html',
            template: './pages/home/index.html',
            chunks: ['home', 'style'],
            inject: 'head',
        }),
        new HtmlWebpackPlugin({
            title: 'Player Stats',
            filename: './player/index.html',
            template: './pages/player/index.html',
            chunks: ['player', 'style'],
            inject: 'head',
        }),
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    },
};
