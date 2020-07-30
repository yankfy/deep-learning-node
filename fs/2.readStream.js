// 1.copy 读和写的操作 严重耦合

// 流 是有方向的 读 =》 写 node 中 实现了 stream 模块

// 文件也想实现流，所以内部文件 继承了stream 模块

const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');

//  创建一个可读流
 
// 返回的是一个可读流对象 默认不会读取内容
// fs.open fs.read fs.close
let rs = new ReadStream(path.resolve(__dirname,'name.txt'),{
// let rs = fs.createReadStream(path.resolve(__dirname,'name.txt'),{
    // 很少给 一般默认
    flags:'r',
    encoding:null, // 默认为buffer
    mode:0o666,
    autoClose:true,
    start:0,
    end:9,
    highWaterMark:3, // 每次读取的个数 相当于 SIZE
});
// console.log(rs);π

// 为了多个异步方法可以解耦，使用发布订阅模式
// 可读流继承了event模块， 名字必须是data 如果监听了data, 内部会读取文件
let bufferArr = [];
rs.on('data',(data)=>{  // 默认会直到文件读取完毕
    // console.log(data); 
    rs.pause(); // 让可读流暂停 触发data 事件
    setTimeout(()=>{
        rs.resume();
    },1000) 
    bufferArr.push(data);
})

rs.on('end',()=>{
    let endString = (Buffer.concat(bufferArr)).toString();
    console.log(endString);
})

rs.on('error',(err)=>{
    console.log(err)
})

rs.on('open',(fd)=>{
    console.log('---' + fd);
})

rs.on('close',()=>{
    console.log('文件关闭');
})
// on('data') on('end') 
 // 文件流 有两个特殊的事件，如果是普通的流 就没有这两个时间

