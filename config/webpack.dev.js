const webpack = require("webpack");
const config = require("./webpack.base");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.devtool = "#eval-cheap-module-source-map";
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": `"development"`,
    })
);
if (process.env.ANALYZER){
    config.plugins.push(new BundleAnalyzerPlugin());
}
config.devServer = {
    host: "0.0.0.0",
    port: "3000",
    hot: true,
    historyApiFallback: true,
};

module.exports = config;
