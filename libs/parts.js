const webpack =  require('webpack')

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
