const fs = require('fs');
const path = require('path');
const ReadSteam = require('./readSteam')
const writeSteam = require('./writeSteam')

// 异步，可实现读一点 写一点
fs.createReadStream('./name.txt')
.pipe(fs.createWriteStream(path.resolve(__dirname, 'copy.txt')))

let rs = new ReadSteam('./name.txt',{highWaterMask:4})
let ws = new WriteSteam('./copy.txt',{highWaterMask:1})

rs.on('data',(data)=>{
    let flag = ws.write(data);
    if(!flag){
        rs.pause();
    }
})