const buf1 = Buffer.alloc(10,21);
const buf5 = Buffer.from('珠峰培训');
console.log(buf5);

// let buffer = Buffer.allocUnsafe(6);
// buffer.write('珠',0,3,'utf8');
// buffer.write('峰',3,3,'utf8');


// let buffer = Buffer.from('珠峰架构');
// let subBuffer = buffer.slice(0,6);
// console.log(subBuffer.toString());
// console.log(buffer)

let {StringDecoder}  = require('string_decoder');
let sd = new StringDecoder();
let buffer = Buffer.from('珠峰');
console.log(sd.write(buffer.slice(0,4)));
console.log(sd.write(buffer.slice(4)));