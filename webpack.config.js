const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
		rules: [{
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
		}]
	},
	plugins: [
		require("autoprefixer")
	]
  }