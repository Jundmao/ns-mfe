const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
    library: 'nsMfe',
    libraryTarget: 'umd'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modules: ['node_modules', 'src']
  },
  externals: {
    'react': 'react',
    'react-router-dom': 'react-router-dom'
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({})
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../build'),
      path.join(__dirname, '..')
    ],
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
