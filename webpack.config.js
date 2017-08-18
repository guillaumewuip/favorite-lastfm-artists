var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path:       path.resolve(__dirname, 'build'),
    publicPath: 'build',
    filename:   'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2017',
                'react'
              ],
            },
        }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    compress:         true,
    port:             9000,
    contentBase:      path.join(__dirname),
    compress:         true,
    watchContentBase: true,
  },
};
