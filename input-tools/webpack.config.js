const path = require("path");

const webpack = require("webpack");
const WebpackCopyPlugin = require("copy-webpack-plugin");

let mode = "development";

// if (process.env.PRODUCTION == "true") mode = "production";

function getDefinePluginConfig() {
  let data = {};
  data["process.env.DEV"] = mode == "development" ? true : false;
  return data;
}


module.exports = {
  entry: {
    background: "./src/main.ts"
  },
  mode,
  output: {
    path: path.resolve(process.cwd(), "./dist"),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.ts$/i, use: "ts-loader"},
      {test: /\.css$/i, use: [
        {
          loader: "css-loader",
          options: {
            exportType: "string"
          }
        }
      ]}
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", "..."],
    alias: {
      src: path.resolve(process.cwd(), "src"),
    },
  },
  plugins: [
    new WebpackCopyPlugin({
      patterns: [
        {from: "./assets/manifest/chromeos-ui.json", to: "./manifest.json"},
        {from: "./assets/html/options.html", to: "./options.html"},
        {from: "./assets/data", to: "./web/data"},
        {from: "../rime-wasm/build/rime_api_wasm/pthread.js", to: "./web/decoders/"},
        {from: "../rime-wasm/build/rime_api_wasm/pthread.wasm", to: "./web/decoders/"},
        {from: "../rime-wasm/build/rime_api_wasm/pthread.worker.js", to: "./web/decoders/"},
      ]
    }),
    new webpack.DefinePlugin(getDefinePluginConfig()), 
  ],
}
