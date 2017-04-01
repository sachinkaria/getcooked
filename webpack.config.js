var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015','react']}},
        {test: /\.jpe?g$|\.gif$|\.svg$|\.png$/i, loader: "file-loader?name=/images/[name].[ext]"},
        {test: /\.css$/, loaders: ['style-loader', 'css-loader', 'sass-loader','resolve-url-loader']},
        {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader','resolve-url-loader']},
        {test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/, loader: 'imports?define=>false&this=>window'}
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
