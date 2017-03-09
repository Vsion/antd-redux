var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');
var log4js = require('log4js');
var logger = log4js.getLogger();

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var publicPath = 'http://localhost:3000/';//解决静态资源路径问题的绝对路径
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var webpackConfig = {
  entry: {
    // index : SRC_PATH + "/index.js",
    commons: [
      'eventsource-polyfill',
      'fetch-ie8',
      'babel-polyfill',
      'react','react-dom',
      'redux','react-redux',
      'lodash'
    ]
  },
  output: {
      path: path.join(__dirname, "build"),
      filename: "service/[name]/bundle.js",
      chunkFilename: "[id].chunk.js",
      // publicPath: publicPath //解决静态资源路径问题的绝对路径
  },
  module: {
      loaders: [
    //         {
    // 　　　　　　test: /\.html$/,
    // 　　　　　　loader: 'html-withimg-loader'
    // 　　　　},
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            include: /src/
          },
          //css 单独打包
          { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')},
          { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
          //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
          { test: /\.(png|jpg|gif|jpeg)$/,
            loader: 'url-loader',
            query: {
              limit: 8192,
              name: 'util/img/[hash:8].[name].[ext]',
              publicPath: '../../'//修改webpack file-loader的源码使其支持传入特定的publicPath改变引用路径
            }
          }
          // { test: /\.(png|jpg|gif|jpeg)$/, loader: 'file-loader?limit=8192&name=util/img/[name].[ext]'}
      ]
  },
  resolve:{
      extensions:['','.js','.json'],
      alias: {
        svc2Src: "../../",//service目录重置回src目录
        cpm2Src: "../../",//service目录重置回src目录
      }
  },
  devServer: {
      hot: true,
      inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('util/css/[name].css'),
    new webpack.DefinePlugin({
      // 'process.env':{
      //   'NODE_ENV': JSON.stringify('production')
      // },
      __DEBUG__: JSON.stringify(JSON.parse('false')), // 开发调试时把它改为true
    }),
    new HtmlWebpackPlugin({
      title : "Wfp-Basic-Dev-Framework",
      filename : "index.html",
      template: 'src/tmpl/index.html',
      inject: true,
      chunks: ["index","commons"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename :'util/js/commons.js',
      // TODO: set node_modules fallback
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: {
    //         except: ['$super', '$', 'exports', 'require']
    //     },
    //     compress: {
    //         warnings: false
    //     }
    // })
  ]
};
// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath),
       entries = {};

     files.forEach(function(filepath) {

         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];

         entries[name] = './' + filepath;
     });

     return entries;
}

var entries = getEntries('src/service/**/entry.js');

Object.keys(entries).forEach(function(name) {
  if(!webpackConfig.entry[name]){//存在的入口不再打包
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = [entries[name],hotMiddlewareScript];
    // webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
      // 生成出来的html文件名
      filename: 'service/'+name + '/index.html',
      // 每个html的模版，这里多个页面使用同一个模版
      template: 'src/tmpl/entry.html',
      // 自动将引用插入html
      inject: true,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: [name,"commons"]//公用模块commons必须引入!
    });
    webpackConfig.plugins.push(plugin);
  }
})

module.exports = webpackConfig;
