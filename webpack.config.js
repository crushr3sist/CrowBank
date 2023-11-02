const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/app.ts',
	externals: [nodeExternals()], // Excludes node modules from the bundle
	externalsPresets: {node: true}, // Tells Webpack to consider node-builtins as externals

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
		fallback: {},
	},
	module: {
		rules: [{test: /\.ts$/, loader: 'ts-loader'}],
	},
};
