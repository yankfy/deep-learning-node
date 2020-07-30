// 通过fs模块实现拷贝功能

// 同步的拷贝

const fs = require('fs');
const path  = require('path');

// 读取默认不指定编码 都是二进制buffer类型

// let r = fs.readFileSync(path.resolve(__dirname,'name.txt'));
// 默认会将二进制转化成字符串存储到文件中
// fs.writeFileSync(path.resolve(__dirname,'age.txt'),r)
// node 主线程是单线程， 内容工作原理是多线程
fs.readFile(path.resolve(__dirname,'name.txt'),(err,data)=>{
    if(err){
        return console.log(err)
    }
    fs.writeFile(path.resolve(__dirname,'age.txt'),data,(err,data)=>{
        console.log('写入成功')
    })
})

// copyFile 会默认把要拷贝的文件整个读取一遍
// 不能读取比内存大的文件，（会占用很多可用内存）

// stream 可以实现边读边写 采用分块读取写入的方式，来实现拷贝
