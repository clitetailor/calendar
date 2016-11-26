let path    = require('path');
let webpack = require('webpack');

//let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: 'source-map',
    debug:   true,

    target: 'electron',

    entry: {
        'app': './app/src/main.ts'
        // 'vendor': [
        //   "reflect-metadata",
        //   "rxjs",
        //   "zone.js",
        //   "@angular/common",
        //   "@angular/compiler",
        //   "@angular/core",
        //   "@angular/forms",
        //   "@angular/http",
        //   "@angular/material",
        //   "@angular/platform-browser",
        //   "@angular/platform-browser-dynamic",
        //   "@angular/router",
        //   "@angular/upgrade",
        // ] 
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
        exclude: path.resolve('./app/src'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: path.resolve('./app/src'),
        loader: 'raw'
      }
    ]
  }
}