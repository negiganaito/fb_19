const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const rsdPlugin = require('react-strict-dom/babel');
const StylexPlugin = require('@stylexjs/webpack-plugin');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const envv = require('./scripts/env');
const TerserPlugin = require('terser-webpack-plugin');

// const reactCompilerLoader = require.resolve("./scripts/react-compiler-loader");
// const defineReactCompilerLoaderOption = (options) => options;
// const {
//   defineReactCompilerLoaderOption,
//   reactCompilerLoader,
// } = require("react-compiler-webpack");

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode !== 'production';

  return {
    mode,
    entry: path.join(__dirname, 'src', 'index.jsx'),
    target: 'web',
    resolve: {
      // extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensions: fileExtensions.map((extension) => '.' + extension).concat(['.js', '.jsx', '.ts', '.tsx', '.css']),

      alias: {
        '@meta-core': path.resolve(__dirname, 'src/core'),
        '@meta-business': path.resolve(__dirname, 'src/business'),
        '@meta-icons': path.resolve(__dirname, 'src/icons'),
        '@meta-example': path.resolve(__dirname, 'src/example'),
      },

      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
      },
    },

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    },

    module: {
      rules: [
        {
          test: /\.?(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: 'babel-loader',
              options: {
                // presets: [
                //   // "@babel/preset-env",
                //   //   "@babel/preset-react",
                //   //   "@babel/preset-typescript",
                //   ["@babel/preset-env"],
                //   [
                //     "@babel/preset-react",
                //     {
                //       development: isDevelopment,
                //       runtime: "automatic",
                //     },
                //   ],
                //   "@babel/preset-typescript",
                // ],
                configFile: path.join(__dirname, '/babel.config.js'),
                // plugins: [isDevelopment && "react-refresh/babel"].filter(
                //   Boolean
                // ),
              },
            },
            // {
            //   loader: reactCompilerLoader,
            //   options: defineReactCompilerLoaderOption({
            //     // React Compiler options goes here
            //   }),
            // },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                // modules: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          grid: true,
                          flexbox: true,
                        },
                      },
                    ],
                  ],
                },
              },
            },
          ],
          // use: [
          //   {
          //     loader: MiniCssExtractPlugin.loader,
          //   },
          //   {
          //     loader: "css-loader",
          //   },
          //   {
          //     loader: "postcss-loader",
          //     options: {
          //       plugins: [require("autoprefixer")],
          //     },
          //   },
          // ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jp(e*)g|gif|webp|avif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                native: false,
              },
            },
          ],
        },
      ],
    },

    cache: true,

    plugins: [
      new MiniCssExtractPlugin(),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        minify: isProduction,
        hash: isProduction,
        cache: isProduction,
        showErrors: !isProduction,
      }),

      new Dotenv({
        systemvars: true,
      }),

      new CleanWebpackPlugin({ verbose: false }),

      new webpack.ProgressPlugin(),
      // new webpack.EnvironmentPlugin(["NODE_ENV"]),

      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      }),

      new CopyPlugin({
        patterns: [{ from: './src/assets', to: '' }],
      }),
      rsdPlugin,
      // Ensure that the stylex plugin is used before Babel
      new StylexPlugin({
        filename: 'styles.[contenthash].css',
        // get webpack mode and set value for dev
        dev: mode === 'development',
        importSources: ['@stylexjs/stylex', { from: 'react-strict-dom', as: 'css' }],
        // Use statically generated CSS files and not runtime injected CSS.
        // Even in development.
        runtimeInjection: false,
        // optional. default: 'x'
        classNamePrefix: 'x',
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: 'commonJS',
          // The absolute path to the root directory of your project
          rootDir: __dirname,
        },
        useCSSLayers: true,
        babelConfig: { plugins: ['@babel/plugin-transform-private-methods'] },
      }),

      isDevelopment && new ReactRefreshWebpackPlugin(),
    ]
      .concat(
        !env.analyze
          ? []
          : [
              new BundleAnalyzerPlugin({
                analyzerHost: 'localhost',
                analyzerPort: 3006,
                reportTitle: 'Template - Analyze Bundle Sizes',
              }),
            ],
      )
      .filter(Boolean),

    optimization: {
      minimize: isProduction,
      mergeDuplicateChunks: true,
      removeEmptyChunks: true,
      sideEffects: false,
      minimizer: [
        // new ESBuildMinifyPlugin({
        //   target: "es2015",
        // }),
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true,
            name: (module) => {
              const [, match] = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]([^\\/]*)([\\/]([^\\/]*))?([\\/]([^\\/]*))?|$)/,
              );

              return `vendors/${match.replace('@', '')}`;
            },
          },
        },
      },
    },

    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 ** 2,
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    devServer: {
      allowedHosts: 'all',
      // client: false,
      devMiddleware: {
        publicPath: `http://localhost:${envv.PORT}/`,
        writeToDisk: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
      host: 'localhost',
      hot: true,
      https: false,
      open: true,
      port: envv.PORT,
      static: {
        directory: path.join(__dirname, 'build'),
      },
    },

    stats: {
      errorDetails: true,
    },
  };
};
