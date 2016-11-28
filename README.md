# hhdata-fe-boilerplate
---
### 使用方法
```
$ npm install
$ npm start
 //open browser and http://127.0.0.1:3000
```
---
### 目录结构说明

- src

  源码目录

- build

  打包文件目录

- mock

  开发环境下mock数据目录，一般存放为具体的json文件

- node_modules

  npm依赖包目录

- .babelrc

  babel的插件配置文件

- package.json

  项目npm配置，一般包括npm命令配置及包依赖信息

- webpack.config.js,webpack.dev.config.js

  webpack配置，其中dev为开发使用配置

### src目录说明

- components

  公用组件存放目录，存放规则按``组件名称``分文件夹。

- logs

  log4js模块输出log文件目录，暂时无用。

- service

  页面功能源码目录，按``功能命名``分文件夹。

- tmpl

  页面html模板目录，功能页面默认以entry.html作为页面模板，由webpack自动生成对应的页面html。

- util  

  公用资源存放目录，包括``css``，``img``，``js``，其中js用于存放公用函数为组，公用组件还是存放components中比较合理。

### 功能源码文件说明

本框架是基于react+redux框架开发，故使用者需提前自行学习react、redux等概念。

在src/service/*/中，其中以下文件为必须：
- entry.js

  功能入口，一般用于配置redux的Provider、根reducer、store、渲染功能页面及引入css。

- actions.js

  当前功能的action配置

- reducers.js

  当前功能的根reducer，当需要拆分不同的子reducer，则需建立reducers目录，再由reducers.js来合并

- 其他文件
  参考src/service/index/中，还有Header、Nav等等组件，考虑到功能的特殊性，故不抽取至components，这样更方便管理（以及reducer的关联）。

### 关于es标准的使用

本框架已整合了babel的"es2015"、"stage-3"、"react"、"babel-polyfill"插件，故可以放心使用es7的语法及特性。

### 关于远程接口调用

根据redux的设计，远程接口的调用一律写在actions.js中，同时已整合了fetch api，故可参考以下代码：


```
export const getMenu = () => {
  return async (dispatch) => {
    //获取菜单资源，async/await是es7的新特性，能让代码等待异步返回再执行后续
    let msg = await fetch('data/menu',{
      method: 'POST',
      body: JSON.stringify({"aa":"aa"}),
      header: {'content-type':'application/json; charset=utf-8'}
    }).then((res)=>res.json())
    //派发action通知store去让reducer更新状态
    dispatch({type: 'GET_MENU',data:msg.data })
    dispatch({type: 'ITEM_CLICK',item:msg.data[0] })
  }
}
```

这是index页面获取菜单资源的方法，通过返回一个异步方法，在调用fetch函数发异步请求前，可使用await进行等待，当请求返回时再赋值给msg，最后再执行后续的dispatch方法。

在dev-server.js已做好开发mock数据的读取路由规则，只要发送data/{name}的请求，就能自动到mock目录下获取{name}.json并返回

### 关于静态资源的使用

- css

  引入css可以直接在对应的功能entry.js中import进来：

  ```
  import 'svc2Src/util/css/{name}.scss';

  ```
  其路径一律使用src中当前文件的相对路径，而svc2Src是预先在webpack中配置好的路径简写，相当于../../。

  框架里已整合了sass，故可以使用.scss文件开发。

- img

  引入图片分为``css引入``、``js引入``两种情况，css引入直接使用相对路径即可，而js引入时，需按模块的方式依赖进来，如：

  ```
  <img src={require('svc2Src/util/img/page-a-img.jpg')} />
  ```

  引入时也是使用相对与当前文件的路径即可。
  
  p.s. 小于8k的图片会以base64方式打包进js里。

### 发布代码方式

  ```
  npm run build
  ```
  webpack会把代码打包至build目录，最后请自行将其目录下内容拷出即可。

### 目前还未处理的问题

- 请求参数处理
  由于开发环境是不包含后台逻辑处理的，故只是简单根据请求获取json而已，需开发者自行造数据（后续可能追加简单的参数处理接口）
