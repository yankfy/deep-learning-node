const fs = require('fs');
const path  = require('path');

// fs.open fs.write
let ws = fs.createWriteStream(path.resolve(__dirname,'name.tst'),{
   flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark:3,
})

