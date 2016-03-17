const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const sourcePath = path.join(__dirname, '/src');
const examplePath = path.join(__dirname, '/www');

module.exports = {
  context: sourcePath,
  entry: {
    javascript: path.join(examplePath, '/example.jsx'),
    html: path.join(examplePath, '/index.html')
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath],
        loaders: ["babel"],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
        exclude: [nodeModulesPath]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass?includePaths[]='+path.resolve(__dirname, "./node_modules/compass-mixins/lib")),
        exclude: [nodeModulesPath]
      },
      { test: /globalize/, loaders: ["babel-loader", 'imports?define=>false'] }
    ],
  },
  externals: {
    'react': 'React',
    'react/addons': 'React',
    'jquery': 'jQuery',
    'jquery': '$',
    'underscore': '_',
    'moment': 'moment'
  },
  devtool: 'eval',
  output: {
    libraryTarget: "var",
    library: "ProperTree",
    filename: "ProperTreeExample.js",
    path: path.join(__dirname, "/dist")
  },
  plugins: [
    new ExtractTextPlugin('propertree.css', {
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin()
  ]
}