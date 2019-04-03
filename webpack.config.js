const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const HappyPack = require('happypack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const CompressionPlugin = require("compression-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

//sentry sourcemap upload
const SentryCliPlugin = require('@sentry/webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({
  size: 5
});

const serverIP = 'http://m.aalgds.com';
// const serverIP = 'http://m.ballbet1.com';

const DEV = process.env.NODE_ENV !== 'production';

const PROJECT_VERSION = require('./package.json').version;
const svgoConfig = require('./svgo-config');
const svgoColorfulConfig = require('./svgo-colorful-config');

const appConfig = {
  entry: {
    main: './src/index.js',
    // video: './src/views/entries/video/index.js',
    sports: './src/views/entries/sports/index.js',
  },
  port: 3006,
  entries: {
    index: {
      title: '贝博',
      template: './entry/index.html',
      chunks: ['commons', 'main'],
    },
    'sports-188': {
      title: '贝博-转发',
      template: './entry/index.html',
      chunks: ['commons', 'sports'],
    },
    // video: {
    //   title: '贝博-视频转发',
    //   template: './entry/index.html',
    //   chunks: ['commons', 'video'],
    // },
  },
  output: {
    path: 'main',
    publicPath: '/',
  }
};

//==============entry================
let entry = _(appConfig.entry).reduce(function (entries, entry, entryName) {
  if (DEV) {
    entry = [
      'webpack-dev-server/client?http://localhost:' + appConfig.port,
      'webpack/hot/only-dev-server'
    ].concat(entry);
  }
  entries[entryName] = entry;

  return entries;
}, {});

//==============output================
let output = {
  path: path.resolve(__dirname, 'www/' + appConfig.output.path),
  publicPath: appConfig.output.publicPath
};

if (DEV) {
  output.filename = '[name].bundle.js';
  output.chunkFilename = '[name].bundle.js';
} else {
  output.filename = '[name].[hash].bundle.js';
  output.chunkFilename = '[name].[hash].bundle.js';
}

//==============plugins================
let plugins = [
  new webpack.ProvidePlugin({
    Vue: ['vue', 'default'],
    mapState: ['vuex', 'mapState'],
    mapGetters: ['vuex', 'mapGetters'],
    // jQuery: 'jquery',
    // 'window.jQuery': 'jquery',
    $: 'jquery',
    _: 'lodash',
    Raven: 'raven-js',

    main: 'main',
    'vant': 'vant',
    ws: ['ws', 'default'],
    api: ['api', 'default'],
    ApiCache: ['ApiCache', 'default'],
    consts: ['consts', 'default'],
    anim: ['anim', 'default'],
    code: ['code', 'default'],
    types: ['types', 'default'],
  }),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /zh-cn/),

  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
      // exclude: /(node_modules|bower_components)/,
      // include: DEV ? [path.join(__dirname, 'src')] : [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules', 'gsap')],
      options: {
        presets: ['@babel/preset-env'],
        cacheDirectory: true,
      }
    }],
  }),
  new HappyPack({
    id: 'scss',
    threadPool: happyThreadPool,
    loaders: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: './src/themes/chalk/src/common/var.scss',
        },
      },

    ],
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'all',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
      default: false,
      // default: {
      //   minChunks: 2,
      //   priority: -20,
      //   reuseExistingChunk: true,
      // },
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        test: /[\\/]node_modules[\\/]/,
        priority: -5,
        reuseExistingChunk: true,
      },
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
];

if (process.env.MODE === 'analyse') {
  plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.BABEL_ENV !== 'test') {
  plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`./src/dll/${process.env.NODE_ENV}/vendor-manifest.json`),
    extensions: ['', '.js']
  }));
}

if (DEV) {
  if (process.env.BABEL_ENV !== 'test') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
} else {
  // plugins.push(new ExtractTextPlugin('[name].[hash].styles.css'));
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].[hash].styles.css",
    chunkFilename: "[id].[hash].styles.css"
  }))
  plugins.push(new CssoWebpackPlugin())

  plugins.push(new AssetsPlugin());
  plugins.push(new UglifyJsPlugin({
    sourceMap: true,
    // uglifyOptions: {
    //   compress: {
    //     inline: false,
    //     // warnings: false
    //   }
    // },
  }));
  plugins.push(new CompressionPlugin())

  plugins.push(new SentryCliPlugin({
    release: PROJECT_VERSION,
    include: './www/main',
    ignoreFile: '.sentrycliignore',
    ignore: ['node_modules', 'webpack.config.js'],
  }))
}

_(appConfig.entries).each(function (entryInfo, entryName) {
  plugins.push(new HtmlWebpackPlugin({
    title: entryInfo.title,
    filename: entryName + '.html',
    template: entryInfo.template,
    chunks: entryInfo.chunks,
    chunksSortMode: 'manual',
    inject: 'body',
    favicon: entryInfo.favicon,
    resources: entryInfo.resources
  }));
});

plugins.push(new AddAssetHtmlPlugin([{
  filepath: path.resolve(`./src/dll/${process.env.NODE_ENV}/*.styles.css`),
  typeOfAsset: 'css',
  hash: true,
  includeSourcemap: false
},
  {
    filepath: path.resolve(`./src/dll/${process.env.NODE_ENV}/*.js`),
    hash: true,
    includeSourcemap: true
  }
]));

//==============modules================
const modules = {
  noParse: appConfig.noParse,
  rules: [{
    test: /\.(jpg|gif)$/,
    use: ['url-loader?limit=1024']
  },
    {
      test: /\.png$/,
      use: ['url-loader?limit=1024!mimetype=image/png!./file.png']
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=10000&minetype=application/font-woff'
    },
    {
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "postcss-loader"
      }, {
        loader: "less-loader",
        options: {
          paths: [
            path.resolve(__dirname, "src/vant")
          ]
        }
      }]

    },

    {
      test: /\.(ttf|otf|eot|svg|swf|mp3|mp4|flv|wav)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader',
      exclude: [path.resolve(__dirname, 'src/svg')]
    },
    {
      test: /\.svg$/,
      include: [path.resolve(__dirname, 'src/svg/colorful')],
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
        {
          loader: 'svgo-loader',
          options: svgoColorfulConfig,
        }
      ]
    },
    {
      test: /\.svg$/,
      include: [path.resolve(__dirname, 'src/svg/single')],
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
        {
          loader: 'svgo-loader',
          options: svgoConfig,
        }
      ]
    },
    {
      test: /(.*)\.html$/,
      use: ['html-loader'],
      include: [
        path.resolve(__dirname, 'src')
      ]
    },
    {
      test: require.resolve('snapsvg/dist/snap.svg.js'),
      use: 'imports-loader?this=>window,fix=>module.exports=0',
    },
    {
      test: /\.vue$/,
      type: 'javascript/auto',
      use: [{
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'happypack/loader?id=js',
            scss: DEV ? [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/themes/common/config.scss',
                  ]
                },
              },
            ] : [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/themes/common/config.scss',
                  ]
                },
              },
            ],
            css: DEV ? [
              'style-loader',
              'css-loader',
              'postcss-loader',
            ] : [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
            ],
          },
        }
      }],
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'test'),
      ]
    },
    {
      test: /\.js$/,
      type: 'javascript/auto',
      use: 'happypack/loader?id=js',
      // include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')]
    },

  ]
};

if (DEV) {
  modules.rules.push({
    test: /\.scss$/,
    use: 'happypack/loader?id=scss',
    include: [
      path.resolve(__dirname, 'src/icons'),
      // path.resolve(__dirname, 'src/vant'),
      path.resolve(__dirname, 'src/themes'),
      path.resolve(__dirname, 'src/directives')
    ],
  });

  modules.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  });

} else {

  modules.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
      // {
      //   loader: 'sass-resources-loader',
      //   options: {
      //     resources: './src/base/styles/_variable.scss',
      //   },
      // },
    ],
    include: [path.resolve(__dirname, 'src')],
  });

  modules.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
    ]
  });
}

module.exports = {
  mode: DEV ? 'development' : 'production',
  devtool: DEV ? 'eval-source-map' : 'source-map',
  entry,
  output,
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    extensions: ['.js', '.vue', '.scss', '.html'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 'vant': 'vant',
      'vue$': 'vue/dist/vue.esm.js',
      ws: path.resolve(__dirname, 'src/consts/ws'),
      consts: path.resolve(__dirname, 'src/consts/consts'),
      api: path.resolve(__dirname, 'src/consts/api'),
      anim: path.resolve(__dirname, 'src/consts/anim'),
      code: path.resolve(__dirname, 'src/consts/responseCode'),
      types: path.resolve(__dirname, 'src/store/mutation-types'),
      ApiCache: path.resolve(__dirname, 'src/utils/api-cache'),
      'gsap-bonus': path.resolve(__dirname, 'src/vendor/scripts/gsap-bonus'),
      snapsvg: 'snapsvg/dist/snap.svg.js',
    }
  },
  plugins,
  module: modules,
  stats: 'errors-only',
  devServer: {
    port: appConfig.port,
    publicPath: appConfig.output.publicPath,
    hot: true,
    // clientLogLevel: 'error',
    historyApiFallback: true,
    inline: true,
    progress: true,
    proxy: {
      '/api/**': {
        target: serverIP,
        changeOrigin: true,
      },
      '/img/': {
        target: serverIP,
        changeOrigin: true,
      },
      '/gl/image/': {
        target: serverIP,
        changeOrigin: true,
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'X-Custom-Header': 'yes'
    },
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      depth: false,
      entrypoints: true,
      hash: true,
      maxModules: 15,
      modules: false,
      performance: true,
      reasons: false,
      source: false,
      timings: true,
      version: false,
      warnings: true,
    },
    overlay: {
      warnings: true,
      errors: true
    },
    // 取消框架域名检测
    disableHostCheck: true
  }
};
