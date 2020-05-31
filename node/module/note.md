# 模块化规范
- common.js 规范 （node自己实现的） 
- es6Modules(import、export) 
- umd（统一模块化规范、如果浏览器不支持 common.js、requirejs，直接将变量放到window上）、amd、require.js

## commonjs规范 （模块的概念）
- 复杂代码拆分小的代码
- 模块内容相互独立、互不影响，解决变量冲突 （单例模式[不能完全解决]->使用自执行函数来解决。

## 规范的定义
    - 每个文件都是一个模块
    - 如果你希望模块中的导出、 module.exports = A;
    - 另一个模块引入、require('path');[同步语法，直接拿到另一个文件模块的结果]

## commonjs 模块分类
- require('fs') 核心模块、内置模块，node提供的，可直接使用
- require('commander') 非node提供，通过npm install 安装、属第三方模块
- require('相对路径、绝对路径') 自定义模块就是自己写的模块、引用时需要绝对路径或相对路径

## 核心模块
- fs =>> fileSystem，path =>> 处理路径 ，vm (虚拟机模块、沙箱环境)