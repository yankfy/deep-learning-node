
## node包管理器 管理的都是node的模块
- 3n nrm(node源管理工具) nvm(node中的版本工具) npm(node包管理工具)

## 第三方模块，分为两种
- 全局模块，只能在命令行中使用，任何路径下都可以。
- 本地模块，开发或者上线使用。

## 包的初始化工作
```bash
npm init -y
```

## 全局模块的安装
```bash
npm install nrm -g
```
*将当前安装的模块放到npm 目录下，执行nrm 命令时，自动执行 cli.js*

nrm的使用 `nrm ls` `nrm use npm`

# 自己编写一个全局包

- 1、先创建bin的配置
- 2、`#! usr/bin/env node` 以什么方式来运行
- 3、放到npm全局中（上传后下载 -g，直接临时拷贝过去）或者用`npm link`

# 安装项目包（来发时使用 -D --save-dev，生产环境使用 不写后缀）
- 项目依赖（--save） 开发依赖 （--save-dev） 同版本依赖 vue vue-template-complier 可选依赖 打包依赖 (npm pack)
- bootstrap 

## 版本问题
- major(破坏性更新) minor(修订大版本功能) patch(小的bug)
- ~ ^ >= <=
- ^2.0.0 不能小于 不能超过3 【限制大版本】
- ~2.3.0 限制中间版本 不能低于2.2.0 不能高于2.4.0
## 版本号标识
- alpha 预览版（内地测试的版本） beta (公测版本) rc(最终测试版) => 上线

## scripts脚本
- 默认运行 npm run 时 node_modules 下的.bin 目录放到全局下，所有可以使用
npm run 类似于 npx npx 可以下载，然后用完了就删除