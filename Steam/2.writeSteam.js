const fs = require('fs');
const path = require('path');
const WriteSteam = require('./writeSteam.js')

// let ws = fs.createWriteStream(path.resolve(__dirname,'name.txt'),{
    let ws = new WriteSteam(path.resolve(__dirname,'name.txt'),{
    highWaterMark:3 // 占用几个字节 // 可以根据这个值来控制写入的速率
})

let index = 0;

// for(let i=0;i<10;i++){
//     ws.write(i+'');
    
// }
function write(){
    let flag = true; // 标识是否达到预期，是否可以写入。
    while(flag && index < 10){
        flag = ws.write(index+++'');
    }
    if(index===10){
        // ws.end('!!') // 文件的关闭操作，ws.write()+ws.close();
    }
}
write();
// 内存被清空 执行
ws.on('drain',()=>{
    console.log('----')
    write();
})

ws.on('close',()=>{
    console.log('close')
})