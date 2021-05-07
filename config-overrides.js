const webpack = require('webpack');
const { addWebpackPlugin, override, useBabelRc } = require('customize-cra');

module.exports = override(
  //Enables dead code elimination during build time for env variables.
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL),
    })
  ),
  useBabelRc()
);
