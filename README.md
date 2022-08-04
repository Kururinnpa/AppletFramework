# AppletFramework

**2022年暑期同济大学字节跳动定向班-小程序框架**

视图层部分功能参考教程：
https://github.com/QuarkGluonPlasma/frontend-framework-exercize/

一个非常简单、基础的框架，能够支持双线程控制、JSX编译和渲染，实现了两种自定义的组件

## 项目介绍

1. 项目结构

   + index.js：要渲染的小程序JSX代码
   + logic.js：逻辑层代码
   + dong.js：视图层代码，定义vdom转换成dom的规则
   + component.js：实现自定义组件
   + .babelrc.js：babel编译配置文件
   + package.json：npm配置文件
   + babel.cmd：babel指令的脚本，由于某些未知原因使用npm install之后babel指令不能正常执行，故按照网上教程自行新建了一个脚本
   + dist：编译结果，进行渲染的最直接文件

2. 双线程控制
   
   + 视图层
      
      小程序的语言使用 JSX，使用 babel 进行编译，通过 react 的 preset 将 JSX 编译为 render function，这个函数返回一个 vdom，使用该 vdom 进行渲染。

      使用 render function 添加自定义组件，并添加了有 diff 功能的 patch 渲染，以上功能参考了前文教程

   + 逻辑层

      使用 Web Worker 建立 logis.js 的另一线程，逻辑层通过接受自定义事件，执行相应的逻辑功能的函数，与渲染独立进行

3. 自定义组件
   项目中基于 react 框架，实现了两个组件：

   - 教程中的 List 组件
   - Pic 组件，能够显示一张图片并通过点击按钮进行缩放，支持图片url与尺寸的自定义

   自定义组件的自定义事件通过发布-订阅模式创建，每一类自定义事件均对应一个发布-订阅模式类，在组件初始化时被订阅，在用户产生操作、即页面发生变化时进行发布操作，该部分在逻辑层中实现。

## 运行方法

1. 在目录中使用 npm install 安装依赖
2. 使用 npm run build 启动本地服务器，在浏览器中进入127.0.0.1可查看渲染效果
