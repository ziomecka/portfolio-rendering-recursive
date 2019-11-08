import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const outputDir = isProduction ? 'prodBundle' : 'devBundle';

const cleanWebpackPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: [
    `**/*.js`,
    '!/**/README.md',
  ],
  verbose: true,
});


module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: !isProduction ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, '../', outputDir),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  entry: {
    'client-side/index':
      path.resolve(__dirname, '../src/client-side/index.ts'),
    'server-side/index':
      path.resolve(__dirname, '../src/server-side/index.ts'),
  },
  resolve: {
    mainFiles: [ 'index' ],
    extensions: [ '.js', '.ts' ],
    modules: [ 'node_modules' ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    cleanWebpackPlugin,
  ],
  module: {
    rules: [
      {
        test: /.*ts$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
    ],
  },
};
