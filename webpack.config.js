const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = [{
  mode: 'production',
  entry: './_sass/_app.scss',
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "webpack.style-bundle.js",
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            implementation: require('sass'),
            sassOptions: {
              includePaths: ['./node_modules'],
              fiber: require('fibers'),
            },
          },
        },
      ]
    }]
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: { removeAll: true }
          }],
        },
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./assets/styles/[name].css"
    })
  ],

}];
