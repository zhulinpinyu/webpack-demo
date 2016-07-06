const webpack =  require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')

exports.devServer = function(options){
  return {
    watchOptions: {
      //Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval(in ms, accepts boolean too)
      poll: 1000
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  }
}

exports.setupCSS = function(paths){
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style','css'],
          include: paths
        }
      ]
    }
  }
}

exports.extractCSS = function(paths){
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style','css'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  }
}

exports.minify = function(){
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
	        warnings: false
        }
      })
    ]
  }
}

exports.setFreeVarible = function(key,value){
  const env = {}
  env[key] = JSON.stringify(value)
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

exports.extractBundle = function(options){
  const entry = {}
  entry[options.name] = options.entries
  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name,'manifest']
      })
    ]
  }
}

exports.clean = function(path){
  return {
    plugins: [
      new CleanWebpackPlugin([path],{
        root: process.cwd()
      })
    ]
  }
}

exports.purifyCSS = function(paths){
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths
      })
    ]
  }
}
