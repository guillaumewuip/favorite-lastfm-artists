var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      }
    ],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
};
