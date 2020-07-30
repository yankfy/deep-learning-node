//  文件系统中内置了 操作文件的方法，（精确的读取文件中的部分内容）

// i/o 操作， 输入 和 输出
// 读取 是 写入，把内容写入到内存
// 写入 把内容读取出来

const fs = require('fs');
const path  = require('path');

// 先读取三个到内存中
const buffer = Buffer.alloc(3);

// flas r 读取 w 写入 a 追加文件
// fs.open(path.resolve(__dirname,'name.txt'),'r',(err,fd)=>{ //fd 文件描述 number
//     console.log(fd);
//     // buffer 的第0个位置开始写入，写入到buffer中几个，文件的读取位置是多少
//     fs.read(fd,buffer,0,3,0,(err,bytesRead)=>{
//         console.log(bytesRead,buffer);
//     })
// })

// 写入操作
const wBuffer = Buffer.from('珠峰架构');
// mode 权限chomd -R 777 默认可读可写 ）0o666
fs.open(path.resolve(__dirname,'age.txt'),'w',(err,fd)=>{
    fs.write(fd,wBuffer,0,12,0,(err,written)=>{
        console.log('成功')
    })
})

// 通过 open 方法，和 fs.read 和 fs.write 实现一个拷贝方法