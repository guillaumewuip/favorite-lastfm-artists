
const
  path    = require('path'),
  dotenv  = require('dotenv'),
  webpack = require('webpack'),
  pkg     = require('./package.json');

dotenv.config();

const LASTFM_API_KEY = (() => {
  if (!process.env.LASTFM_API_KEY) {
    throw new Error('Need LASTFM_API_KEY env variable');
  }

  return process.env.LASTFM_API_KEY;
})();

module.exports = {
  entry: './src/index.jsx',
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
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      LASTFM_API_KEY,
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json', '.css'],
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
