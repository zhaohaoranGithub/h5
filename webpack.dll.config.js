let webpack = require('webpack');
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  context: __dirname,
  output: {
    path: path.join(__dirname, `src/dll/${process.env.NODE_ENV}`),
    filename: '[name].js',
    library: '[name]_library',
  },
  entry: {
    'vendor': [
      'vue',
      'vuex',
      'vue-router',
      'lodash',
      'jquery',
      'velocity-animate',
      'raven-js',
      './src/vendor/build.core.js',
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: Boolean(DEV),
      'process.env': {
        NODE_ENV: DEV ? '"development"' : '"production"'
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      // uglifyOptions: {
        // compress: {
        //   inline: false
        // }
      // },
    }),
    // new webpack.optimize.minimize(),
    new webpack.DllPlugin({
      path: path.join(__dirname, `src/dll/${process.env.NODE_ENV}`, '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery',
      bootstrap: 'bootstrap',
      _: 'underscore',
      // R: 'ramda',
      Raven: 'raven-js',
    }),
    // new ExtractTextPlugin('[name].styles.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].styles.css",
      chunkFilename: "[id].styles.css"
    }),
    new CssoWebpackPlugin(),
    // new CompressionPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|swf|mp3|wav)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules', 'ramda')],
        exclude: /jquery|jqmeter|turn.html4/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/base/styles/_variable.scss',
            },
          },
        ],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ],
  },
  resolve: {
    alias: {
      bootstrap: 'vendor/scripts/bootstrap',
      modernizr: 'vendor/scripts/modernizr',
      vue: 'vue/dist/vue.esm.js',
    },
  },
}
