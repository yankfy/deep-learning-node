let fs = require('fs');
const EventEmitter = require('events');
let LinkList = require('./linkList');

class Queue {
    constructor() {
        this.LinkList = new LinkList();
    }
    offer(element) {
        this.LinkList.add(element);
    }
    poll() {
        return this.LinkList.remove(0);
    }
}

class WriteSteam extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || 'uft8';
        this.start = options.start || 0;
        this.mode = options.mode || 0o666;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        // 维护当前存入的数据个数
        this.len = 0; // 每次调用write,会根据写入的 缓存的长度
        this.writing = false; // 当前是否正在写入
        this.needDrain = false; // 是否需要触发drain 事件
        this.offset = this.start; // 写入偏移量
        this.cache = new Queue(); // 用来缓存;
        this.open();
    }
    open() {
        fs.open(this.path, this.flags, this.mpde, (err, fd) => {
            if (err) return this.emit('error', err);
            this.fd = fd;
            this.emit('open', fd)
        })
    }
    // 数据的格式 可以是string or buffer;
    write(chunk, encoding = 'uft8', cb = () => {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.lengh;
        let flag = this.len < this.highWaterMark; // 这就是write的返回值
        this.needDrain = !flag;
        // 有可能是写缓存 有可能是写内存链表
        if (this.writing) {
            this.cache.offer({
                chunk,
                encoding,
                cb
            })
        } else {
            // 没有正在写入
            this.writing = true;
            this._write(chunk, encoding, () => {
                cb();
                this.clearBuffer();
            }); // 真正写入的逻辑
        }
        return flag
    }) {
        // 用户是同步调用的write方法
        console.log(this.fd)
    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                this._write(chunk, encoding, cb)
            })
        }
        // this.fd 文件描述符
        fs.write(this.fd, chunk, 0, chunk.lengh, this.offset, (err, written) => {
            this.len -= written; // 缓存的数量减少
            this.offset += written;
            cb(); // 当前文件内容写入完毕后，清空缓存
        })
        // 真正写入的逻辑，肯定是fs.write();
    }
    clearBuffer() {
        let data = this.cache.poll();
        if (data) {
            // 需要清空缓存
            let {
                chunk,
                encoding,
                cb
            } = data;
            this._write(chunk, this.encoding, () => {
                cb();
                this.clearBuffer();
            })
        }else{
            this.writing = false;
            if(this.needDrain){
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
}

module.exports = WriteSteam;