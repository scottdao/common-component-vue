# 组件库说明
## 概述
为了满足定制化的需求，提高代码的可复用性，设计一套基于antd的后台组件库。
## 如何使用
[私有npm仓库使用说明]()
```
yarn install @form/common-component-vue
```
## 文档
- `npx styleguidist server`可在本地查看
- 在线文档待补充

## 贡献
### 代码规范
使用eslint作为代码规范自动化检查工具。为了构建方便，直接使用了airbnb的代码规范，再根据实际使用做定制化。
### 开发环境及构建工具
使用webpack作为构建工具。
### 发布


```
npm run build
npm publish
```
### 文档
使用[styleguidist]()作为文档及在线demo的生成工具。
### 目录结构
```
├── docs
│   ├── installation.md         // 安装说明
│   └── introduction.md
├── esm                         // es版本发布包
│   ├── DisabledTipsButton
│   │   └── index.js
│   └── index.js
├── lib                        // commonjs版本发布包
├── examples 
│   └── src
│       ├── index.html
│       └── index.js
├── src                        // 组件源码
│   ├── components
│   │   ├── DisabledTipsButton
│   │   │   ├── Readme.md
│   │   │   ├── style.css
│   │   │   └── index.jsx
│   │   └── index.js
│   ├── styleguide   
│   │   ├── Wrapper            // styleguide全局配置
│   ├── index.js
│   └── styles.css
├── styleguide
│   ├── build
│   │   └── bundle.4b0a7458.js
│   └── index.html
├── Readme.md
├── babel.config.js
├── package-lock.json
├── package.json
├── styleguide.config.js     // styleguide配置文件
└── webpack.config.js
```
### 测试
暂无
### 组件写法及规范
- 开发新组件在src/components下建立文件夹，使用**帕斯卡命名法**，如`DisabledTipsButton`
- 组件文件夹:
    <!-- - index.jsx为组件源码，组件接收的props使用**propTypes**进行类型检查，并为每个prop添加**jsDoc**注释 -->
    <!-- - 建议组件内部使用**styled-components**编写样式代码，也可以在组件文件夹内单独抽出style.css文件 -->
    <!-- - Readme.md为组件文档代码，[**styleguide**](https://react-styleguidist.js.org/docs/documenting.html#usage-examples-and-readme-files)根据它生成可交互的组件使用文档， -->
- 代码规范及其他
    - 使用airbnb规范，希望你在开发过程中自觉消除所有不符合规范的代码
    - 希望你的代码具有较高的**易读性，可维护性**，并为代码提供**详细易懂的注释**
    - 希望你在修改已有的组件时保证**兼容性**，并为修改部分提供**详细的注释**并且补充**文档和更新说明**
    - 希望你在添加组件时尽可能多的考虑适配性，可通用性，编写出**可供他人使用**的组件
### 开发流程
- 在src/components文件夹下开发组件，在src/index中引入需要测试的组件，并执行`npm run start`测试。
- 在对应组件下的Readme中编写组件的在线文档。执行`npm run doc:server`本地预览文档。
- 执行`npm run doc:build`生成组件库文档。

## 更新说明
###0.0.1
`2021-04-26`
- 引入通用form表单，对接后台管理系统