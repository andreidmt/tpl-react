/* eslint-env node */

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const IS_PROD = process.env.NODE_ENV === "production"

const config = {
  entry: "./src/index.jsx",

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
  },

  devtool: IS_PROD ? false : "inline-source-map",

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },

  devServer: IS_PROD
    ? {}
    : {
        historyApiFallback: true,
        liveReload: false,
        hot: true,
      },

  plugins: [
    ...(IS_PROD ? [] : [new ReactRefreshWebpackPlugin()]),

    new HtmlWebPackPlugin({
      template: "public/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),

    new Dotenv({
      path: "./.env",
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "public/robots.txt",
          to: "robots.txt",
        },
      ],
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      // If using Lerna monorepos or symlinked libraries, react hooks will fail
      // with "Hooks can only be called inside the body of a function component"
      // caused by having multiple React version.
      // Confirm following https://reactjs.org/warnings/invalid-hook-call-warning.html
      //
      // Fix this by telling Webpack to only use the main package's node_modules
      // version of React related libraries.
      //
      // Read this for more: https://github.com/facebook/react/issues/13991
      react: path.resolve("./node_modules/react"),
      redux: path.resolve("./node_modules/redux"),
      "react-redux": path.resolve("./node_modules/react-redux"),
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),

      "core.ui": path.resolve("./src/core.ui/"),
      "core.libs": path.resolve("./src/core.libs/"),
      "layout.base": path.resolve("./src/layout.base/"),
    },
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
}

module.exports = (environment, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "[name].[fullhash].js"
  }

  return config
}
