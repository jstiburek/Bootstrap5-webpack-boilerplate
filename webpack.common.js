const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");

//TODO: Let's get rid of this in the future.
const Dotenv = require("dotenv-webpack");

module.exports = {
  target: "web",
  entry: {
    index: './src/js/index.js',
  },
  output: {
    publicPath: "/",
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|otf|eot)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/[folder]/[name].[hash:6].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "conf/config.env"),
    }),
    new HTMLWebpackPlugin({
      title: "Form",
      inject: true,
      hash: true,
      scriptLoading: 'defer',
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.ejs"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
