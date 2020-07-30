const fs = require('fs');

// gbk -uf8 互转
const iconv = require('iconv-lite')

// let r = fs.readFileSync('./name.txt') // 文件只能是根目录

// r = iconv.decode(r,'utf8');

// console.log(r);

let buffer = Buffer.from('珠'); // 
console.log(buffer)