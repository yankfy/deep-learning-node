const fs = require('fs');
const path = require('path');

// 写入文件 没有文件会自从创建 
const copy = (source, target, callback) => {
    fs.open(source, 'r', (err, rfd) => { // fd 文件描述符 linux 规定好的，数字类型
        // win 从3开始 mac 从2开始 
        const SIZE = 3;
        const buffer = Buffer.alloc(SIZE);
        let readOffset = 0;
        let writeOffset = 0;
        if (err) {
            console.log('1')
            return callback(err);
        }
        // flags是必传参数  r 是读取 w 是 写入【默认会覆盖】  a 是追加
        fs.open(target,'w',(err, wfd) => {
            if (err) {
                console.log('2')
                return callback(err)
            }
            const next = () => {
                fs.read(rfd, buffer, 0, SIZE, readOffset, (err, bytesRead) => { // bytesRead 读取到的个数
                    if (err) {
                        console.log('3')
                        return callback(err)
                    }
                    readOffset += bytesRead; // 更改读取的偏移量
                    fs.write(wfd, buffer, 0, bytesRead, writeOffset, (err, written) => {
                        if (err) {
                            console.log('4')
                            return callback(err)
                        }
                        writeOffset += written; // 更改写入的偏移量
                        if (bytesRead === SIZE) { // 本地读取完毕后 可能还有值
                            next();
                        } else {
                            fs.close(rfd, () => {

                            });
                            fs.close(wfd, () => {

                            });
                            console.log('5')
                            callback(); // 完成后
                        }
                    })
                })
            }
            next();
        })
    })
}
// 边读边写 合理使用内存 不会淹没系统内存
copy(
    path.resolve(__dirname, 'name.txt'),
    path.resolve(__dirname, 'copy.txt'),
    (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("拷贝成功");
    });