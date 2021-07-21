const path = require('path');
const webpack = require('webpack');

require("@babel/register");

const config = {
	entry: ['./src/index.ts'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'lib'),
		publicPath: 'lib',
		libraryTarget: 'commonjs2'
	},
	node: {
		fs: 'empty',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node-modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
	// Please do not, for the love of god, do JSON.stringify(process.env)
	// It would expose all server environment variables to the bundled JS!
	plugins: [new webpack.DefinePlugin({
		// 'process.env.API_URL': JSON.stringify(process.env.API_URL),
	})],
};

module.exports = config;
