// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
    library: 'nsMfe',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            ascii_only: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  externals: {
    'react': 'react',
    'react-router-dom': 'react-router-dom'
  },
  module: {
    rules: rules.concat([{
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
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
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          name: 'image/[hash].[ext]'
        },
      }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: []
    }),
    new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash].css',
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.prod.html',
      hash: true,
      random: Math.random().toString().slice(2)
    })
  ]
}
