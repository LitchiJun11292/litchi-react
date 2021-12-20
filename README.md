# react dajian

### 工程介绍

基于 React 全家桶搭建的工程化方案，该工程集成 路由、数据管理、Fetch、Mock 数据 为一体，旨在方便一键搭起 Web 单页应用。

#### 工程 features

- react-router-dom，以 React Suspense 和 lazy 组件实现路由懒加载
- hash 路由，通过引入 src/core/history.js 在任意代码中实现编程导航；组件导航使用 Link 或 Navlink 等
- redux、react-redux
- Fetch 封装 get、post、put、delete 等方法请求，并统一处理请求返回 code；开发环境时，可以请求 mocks 数据

### 项目命令

#### 安装项目依赖

```
npm install
```

#### 启动项目

```
npm run start
```

#### 构建项目

##### 构建哈希版 bundle

```
npm run build
```

##### 构建版本号 bundle

```
npm run build:version
```

#### 分析、lint、测试

##### 构建信息分析

```
npm run build:report // 查看构建包信息
npm run build:closure // 关闭作用域提升
```

##### 语法检查 lint

```
npm run lint // 通过 eslint 检查 .js 语法
npm run lint:fix // 通过 eslint 检查并修复 .js 语法
npm run stylelint // 通过 stylelint 检查样式语法
npm run stylelint:fix //通过 stylelint 检查并修复样式语法
```

##### 测试

```
npm run test // 运行测试
npm run test:coverage // 运行测试并生成覆盖率文件
npm run test:clean // 清除测试生成的覆盖率文件
npm run test:watch // 启动监听文件更改，更改时重新运行测试
```

### git 提交

git 提交前将会校验并修复 eslint 和 stylelint，还会运行所有测试，校验不通过会阻止 git 提交

### 参考文档

- https://github.com/nlffeng/white-react
- https://www.jianshu.com/p/cb8b46478ae5

### 相关文档

- https://zh-hans.reactjs.org/
- https://redux.js.org/
- https://react-redux.js.org/
- https://reactrouter.com/
- https://github.com/reduxjs/reselect
- https://www.babeljs.cn/
- https://github.com/browserslist/browserslist

### 注意

- 本项目使用 reactrouter6 搭建，6 版本中增加了新特性和迁移
  - <Switch>重命名为<Routes>。
  - <Route>的新特性变更。
  - 嵌套路由变得更简单。
  - 用 useNavigate 代替 useHistory。
  - 新钩子 useRoutes 代替 react-router-config
  - 详细请参考：https://blog.csdn.net/weixin_40906515/article/details/104957712 ，
