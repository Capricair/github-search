const webpack = require("webpack");
const config = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

config.output.filename = "[name]-[hash:8].js";

config.plugins.push(
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": `"production"`,
  })
);
config.plugins.push(new CleanWebpackPlugin());

module.exports = config;
