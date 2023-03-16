const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const PACKAGE = require('./package.json');
const version = PACKAGE.version;

module.exports = (env, argv) => ({
  mode: 'production',
  output: {
    filename: "[name].[contenthash].js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `$dev: ${argv.mode === 'development'};`
            }
          }
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: "preact/compat",
      'react-dom': "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: "./src/index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          transform(content) {
            return content
              .toString()
              .replace('$VERSION$', version);
          }
        }
      ]
    })
  ],
});
