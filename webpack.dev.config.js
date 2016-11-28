var defaultCfg = require('./webpack.config');
var webpack = require('webpack');
var _ = require('lodash');

var webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(JSON.parse('true')), // 开发调试时把它改为true
    })
  ]
}

// module.exports = defaultCfg;
module.exports = _.merge({}, defaultCfg, webpackConfig);
