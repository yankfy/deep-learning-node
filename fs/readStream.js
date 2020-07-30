const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        // 参数 放在 constructor
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end;
        // 读取的数量默认是64k, 如果文件大于64k,就可以采取流的方式
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        // 记录读取的偏移量
        this.position = this.start;
        // 默认创建一个可读流，是非流动模式，不会触发data事件。
        // 如果用户监听了data事件，需要变为流动模式
        this.flowing = false; // 是否为流动模式
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true;
                this.read(); // fs.read()
            }
        })

        this.open(); // 打开文件

    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            };
            this.fd = fd;
            this.emit('open', this.fd);
        })
    }

    read() {
        // 读取必须要等待文件打开完毕 
        if (typeof this.fd === 'number') {
            console.log(this.fd)
            // 在这之后文件肯定已经打开 可以开始读取操作

            let buffer = Buffer.alloc(this.highWaterMark);
            let howMuchToRead = this.end ? Math.min(this.end - this.position + 1, this.highWaterMark) :
                this.highWaterMark;
            fs.read(this.fd, buffer, 0, howMuchToRead, this.position, (err, bytesRead) => {
                if (bytesRead) {
                    this.position += bytesRead;
                    this.emit('data', buffer.slice(0, bytesRead));
                    this.read();
                } else {
                    this.emit('end');
                    if(this.autoClose){
                        fs.close(this.fd,()=>{
                            this.emit('close');
                        })
                    }
                }
            });
        } else {
            return this.once('open', () => {
                this.read()
            });
        }
    }
    pause() {
        this.flowing = false;
    }
    resume() {
        this.flowing = true;
        this.read();
    }
}

module.exports = ReadStream;