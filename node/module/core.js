const fs = require('fs');
const path = require('path');

// 所有的方法基本都是同步方法、异步方法

// 同步：如果刚刚运行程序，可以去使用同步的
// 异步：开启一个服务监听客户端访问，就需要使用异步。

// 操作文件时，尽量使用绝对路径来进行操作。
// 获取当前目录，cwd() 可变  __dirname 不可变 ->>[代表当前文件所在的文件夹]
let filePath = path.resolve(__dirname,'./note.md') //resolve 不能遇到 /
// path.join(__dirname,'./note.md','/') // join 为拼接
let fileExtName = path.extname(filePath); //获取文件后缀名
console.log(fileExtName)

// 读文件之前，判断是否存在
// ! 异步api已废弃
// fs.exists(filePath,(err,data)=>{
//     console.log(err)
// }) 
// ! 同步规范
let isFileExist = fs.existsSync(filePath);
console.log(isFileExist)
fs.readFileSync(filePath,'utf8')

// 虚拟机模块（沙箱）干净的环境、测试用例
// 内部一般情况下，操作的都是字符串逻辑，如何让一个字符串来运行
// eval 默认会取当前作用域下变量，不干净的环境
const a = 100;
// let fn = new Function('a','b',`console.log(a)`); 
// 可以使用 new Function 创建一个沙箱环境、让字符串执行
// 查看参数、作用域有没有。独立函数，不去window 查找
// console.log(fn.toString())
// console.log(fn())

// 模板引擎的实现原理 with 语法 + 字符串拼接 + new Function实现

// 虚拟机模块
const vm = require('vm');
vm.runInThisContext(`console.log(1)`); 