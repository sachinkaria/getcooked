var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                'css!sass')
        }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, new ExtractTextPlugin({filename: 'app/styles/main.css', disable: false, allChunks: true })]
};
