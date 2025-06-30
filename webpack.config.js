require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/order_app/' : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.', globOptions: { ignore: ['**/index.html'] } }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_LOGIN': JSON.stringify(process.env.REACT_APP_LOGIN),
      'process.env.REACT_APP_PASSWORD': JSON.stringify(process.env.REACT_APP_PASSWORD),
    }),
  ],
  devServer: {
    static: './public',
    historyApiFallback: true,
    port: 3000,
  },
}; 