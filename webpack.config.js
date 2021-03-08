/* eslint-env node */

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = (environment, props) => {
  const IS_PROD = props.mode === "production"

  return {
    entry: "./src/index.jsx",

    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),

      // Cannot use 'contenthash' when hot reloading is enabled.
      filename: IS_PROD ? "js/[name].[contenthash].js" : "js/[name].js",
    },

    devtool: IS_PROD ? false : "inline-source-map",

    // In webpack-dev-server@3, there is a bug causing it to mis-judge the
    // runtime environment when the Webpack 5 browserslist target is used.
    //
    // It then fallbacks to thinking a non-browser target is being used, in
    // turn skipping injection of the HMR runtime, and thus breaking downstream
    // integrations like this plugin.
    //
    // To overcome this, you can conditionally apply the browserslist only
    // in production modes in your Webpack configuration:
    target: IS_PROD ? "browserslist" : "web",

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
          // Enable gzip compression for everything served:
          compress: true,

          // When using the HTML5 History API, the index.html page will likely
          // have to be served in place of any 404 responses.
          historyApiFallback: true,

          // Full page reload/refresh when file changes are detected.
          liveReload: false,

          // Enables Hot Module Replacement without page refresh
          hot: true,
        },

    plugins: [
      ...(IS_PROD ? [] : [new ReactRefreshWebpackPlugin()]),

      new HtmlWebPackPlugin({
        template: "public/index.html",
      }),

      new MiniCssExtractPlugin({
        // Cannot use 'contenthash' when hot reloading is enabled.
        filename: IS_PROD ? "css/[name].[contenthash].css" : "css/[name].css",
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
}
