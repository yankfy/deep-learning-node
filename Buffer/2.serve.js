// 服务端可以操作二进制buffer，可以和字符串相互转化
// Buffer不能扩容

// 1.Buffer的三种声明方式， 通过长度来声明

const buffer = Buffer.alloc(5); // 开发中数字都是以字节为单位
const buffer1 = Buffer.from('珠峰'); // 一个汉字 三个字节
const buffer2 = Buffer.from([0x16,0x32])
console.log(buffer);
console.log(buffer1,buffer1.length) // 6
console.log(buffer2) // 逐一指定

// 不具备 拓展 push、 unshift 方法

// Buffer 方法
// slice() // 截取方法
// length // Buffer 长度
// isBuffer // 是否为二进制buffer 
// copy // 用的少
// concat

const buffer3 = Buffer.from('Zu峰jia');
const buffer4 = Buffer.from('gou');
const bigBuf = Buffer.alloc(12);
// buffer3.copy(bigBuf,0,0,8)
// buffer4.copy(bigBuf,8)
// console.log(bigBuf.toString())

console.log((Buffer.concat([buffer2,buffer3,buffer4],1000)).toString())

Buffer.concat = function (bufferList,length = bufferList.reduce((a,b)=>{
      a+b.length
},0)){
    let buffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(buffer,offset);
        offset += buf.length;
    })
    return buffer.slice(0,offset);
}

// 文件上传 => 分片上传 => buffer 来拼接