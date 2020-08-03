const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = [{
  mode: 'production',
  entry: './_sass/main.scss',
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "webpack.style-bundle.js",
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        ccssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },

  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "main.css"
  //   })
  // ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: './assets/styles/',
          //   },
          // },
          {
            loader: 'file-loader',
            options: {
              name: 'main.css',
              outputPath: './assets/styles/',
            },
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
    ],
  },
}];
