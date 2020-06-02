const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const path = require('path');

module.exports = (webpackConfigEnv = {}) => {
  const opts = {
    orgName: 'openemp-mf',
    projectName: 'styleguide',
    port: 9001,
  };

  return {
    entry: path.resolve(process.cwd(), `src/${opts.orgName}-${opts.projectName}.js`),
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: 'system',
      path: path.resolve(process.cwd(), 'dist'),
      jsonpFunction: `webpackJsonp_${opts.projectName}`,
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: 'fonts',
              outputPath: 'fonts',
            },
          },
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      compress: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
      port: opts.port,
    },
    externals: ['react', 'react-dom', 'single-spa', new RegExp(`^@${opts.orgName}/`)],
    plugins: [
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: webpackConfigEnv.analyze ? 'server' : 'disabled',
      }),
      new UnusedFilesWebpackPlugin({
        globOptions: {
          cwd: path.resolve(process.cwd(), 'src'),
          ignore: ['**/*.test.*', '**/*.spec.*', '**/*.*.snap', '**/test-setup.*', '**/*.stories.*'],
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.wasm', '.json'],
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        themes: path.resolve(__dirname, 'src/themes'),
      },
    },
  };
};
