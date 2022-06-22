const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true,
    watchOptions: {
        poll: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mapbox et Météo',
      template: path.resolve(__dirname, './src/index.html.tpl')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
            'style-loader',
            'css-loader'
        ]
      },
      {
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: 'asset/resource'
      }
    ]
  }
};