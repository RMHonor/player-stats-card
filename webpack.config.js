const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

const commonConfig = {
  context: `${__dirname}/src`,

  entry: {
    bundle: './index.js',
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
          'autoprefixer-loader?browsers=last 5 version',
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
      template: './index.html',
      chunks: ['bundle', 'style'],
      inject: 'body',
    }),
  ],
};

const devConfig = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};

const prodConfig = {
  devtool: 'nosources-source-map',
  plugins: [
    new UglifyJSPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production'){
  module.exports = merge(commonConfig, prodConfig);
} else {
  module.exports = merge(commonConfig, devConfig);
}
