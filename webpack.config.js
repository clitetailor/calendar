let path    = require('path');
let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let helpers = require('./config/helpers');


module.exports = {
    devtool: 'source-map',
    debug:   true,

    target: 'electron',

    entry: {
        'render': './src/render/main.ts'
    },

    output: {
        path: './dist',
        publicPath: './dist',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html'],
    },

    module: {
      loaders: [{
        test: /\.ts$/,
        loaders: ['ts']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        loader: 'raw'
      }]
  }
}