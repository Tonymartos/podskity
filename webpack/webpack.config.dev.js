/* eslint-disable no-undef */

const path = require('path'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: '/'
  },
  entry: {
    main: "../src/index.js",
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }],
            ['@babel/preset-react'],

          ],
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.[jt]sx?$/,
        use: ['babel-loader', '@svgr/webpack', 'url-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('../public/index.html')
    })],
  devtool: "inline-source-map",
};