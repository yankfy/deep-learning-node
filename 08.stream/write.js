const fs = require('fs');
const path = require('path');

// ! 创建一个可写流 createWriteStream
const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'),{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    highWaterMark: 2// 默认写的水位线是16k
});
// ws 可写流  ws.write()  ws.end();   ws.on('open') on('close')

let flag = ws.write('1'); // 只能写入 string 或者buffer类型  fs.write
ws.write('2');
ws.write('3');
ws.write('4');
console.log(flag); // 将多个异步任务进行排队依次来执行

ws.end('ok'); // = ws.write 把ok写入 ws.close
ws.end(); //  write after end 已经关闭不能在写入