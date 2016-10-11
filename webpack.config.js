let path    = require('path');
let webpack = require('webpack');

//let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

let helpers = require('./config/helpers');


module.exports = {
    devtool: 'source-map',
    debug:   true,

    entry: {
        'app': './app/src/main.ts'
    },

    output: {
        path: './app/built',
        publicPath: './app/built',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  }
}