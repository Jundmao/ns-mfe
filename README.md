# ns-mfe

React微前端架构方案

## 理念

将前端应用由单一的SPA应用转变为多个子应用聚合为一的应用，各个子应用还可以单独开发、测试、部署

应用划分为product和各个子app

### product

处理页面公用部分逻辑，进行子应用的注册

### app

负责自身业务逻辑逻辑，注册路由与组件的对应关系

## 使用

### 应用注册

product与子app在不同项目中时

```
// product
import nsMfe from 'ns-mfe'

nsMfe.registerApplication('user', {
  path: '/user',
  entry: 'user.js'
}

// user.js
import nsMfe from 'ns-mfe'

nsMfe.registerRoutes('user', [
  {
    path: '/home',
    component: require('bundle-loader?lazy!./container/home')
  },
  {
    path: '/profile',
    component: require('bundle-loader?lazy!./container/profile')
  }
])
```

product与子app在同一项目时（component也可以使用bundle-loader）

```
// product
import nsMfe from 'ns-mfe'

nsMfe.registerApplication('user', {
  path: '/user',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
})
```

### 路由配置

```
import {
  HashRouter as Router,
  Switch
} from 'react-router-dom'

<Router>
  <Switch>
    { nsMfe.routes() }
    <Route component={NoMatch} />
  </Switch>
</Router>
```

## 公共依赖

子app的公共依赖放到product中去处理

```
antd babel-polyfill react react-dom react-router-dom
```

### webpack

product负责把公共依赖包打包成vendor

```
import 'babel-polyfill'

window.React = require('react')
window.ReactDOM = require('react-dom')
window.ReactRouterDOM = require('react-router-dom')
window.antd = require('antd')
window.nsMfe = require('ns-mfe')
```

product和各app在webpack里配置

```
externals: {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  'antd': 'antd',
  'ns-mfe': 'nsMfe'
}
```

## 子app构建

### css命名空间

子app会渲染在有`ns-mfe-app-${name}`类名的容器下

配置postcss的namespace为所有css加上该类名的namespace

### jsonp函数名

各个子app需要配置唯一的webpack jsonp名称

```
output: {
  jsonpFunction: 'webpackJsonp' + Date.now()
}
```

## 权限判断

<!-- 权限交由各个子app自己判断，可以通过装饰一个permission的HOC -->

## 其他注意事项

注意不能使用`babel-plugin-import`，否则引用到的antd组件不是同一份，会导致`ConfigProvider`配置不生效

子app从概念上相当于一个独立的项目，即使和product放在同一项目里实现，也不要直接`import`自身文件夹以外的文件，方便日后迁移出去

可以通过`mobx inject`，或者`ns-mfe.define`来实现对其他模块的访问
