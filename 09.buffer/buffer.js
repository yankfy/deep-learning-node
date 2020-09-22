// 进制转换
console.log(parseInt('10',2)) // 转成十进制

console.log(10.0.toString(2)) // 十进制转成X进制

// gbk中一个汉字2个字节 utf8 一个汉字三个字节。 base64编码是将3*8的格式专程4*6的


// 1.buffer的声明方式  固定大小 声明出来后不能随意改变
var buffer = Buffer.alloc(6); //  字节数  默认后端声明大小的数量 都是字节数 
var buffer = Buffer.from('深度学习'); // buffer的长度是字节数目长度

// 二进制是以0b开头 八斤 0o  16进制 0x
var buffer = Buffer.from([0x01,2,3,4,0x64])
console.log(buffer) // utf8 base64


// 想改buffer 可以通过索引更改
// 想更改buffer的大小，是无法更改的 可以在声明一个空间将结果拷贝过去
var buf = Buffer.alloc(12)
var buffer1 = Buffer.from('深度');
var buffer2 = Buffer.from('学习');

Buffer.prototype.copy = function (targetBuffer,targetStart,sourceStart=0,sourceEnd = this.length) {
    for(let i = sourceStart; i< sourceEnd ;i++){
        targetBuffer[targetStart++] = this[i]
    }
}
buffer1.copy(buf,0,0,6)
buffer2.copy(buf,6,0,6)

// buffer的slice方法 
Buffer.concat = function (bufferList, length = bufferList.reduce((a,b)=>a+b.length,0)) {
    let buf = Buffer.alloc(length);
    let offset = 0
    bufferList.forEach(bufItem => {
        bufItem.copy(buf,offset);
        offset += bufItem.length;
    });
    return buf.slice(0,offset)
}
const newBuffer = Buffer.concat([buffer1,buffer2],100)
console.log(newBuffer)
console.log(Buffer.isBuffer(newBuffer))

// Buffer 没有改变buffer本身的方法
