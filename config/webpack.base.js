const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js?v=[hash:8]",
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      hash: true,
      title: "React",
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              // importLoaders: 2,
            },
          },
          {
            loader: "./config/loaders/vw-px2rem-loader.js",
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // outputStyle: "expanded",
              },
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|eot|ttf|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 1024,
              esModule: false,
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  // optimization: {
  //     runtimeChunk: {
  //         name: "runtime",
  //     },
  //     splitChunks: {
  //         cacheGroups: {
  //             vendors: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 chunks: "all",
  //                 name: "vendors",
  //                 priority: 10,
  //             },
  //         },
  //     },
  // },
};
