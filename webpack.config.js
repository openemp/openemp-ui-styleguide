const { mergeWithRules } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');

const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'openemp',
    projectName: 'styleguide',
    webpackConfigEnv,
    argv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(defaultConfig, {
    // customize the webpack config here
    plugins: [new DotenvWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              // publicPath: `//${opts.host}:${opts.port}/fonts`,
              outputPath: 'fonts',
            },
          },
        },
      ],
    },
    externals: ['single-spa', 'react-dom', 'react', new RegExp(`^@${defaultConfig.orgName}/`)],
  });

  return config;
};
