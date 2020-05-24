const RESLOVED = 'RESLOVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';
console.log('my')

const reslovePromise()

// 简单的Promise
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onReslovedCbs = []; // 成功回调数组
        this.onRjectedCbs = []; // 失败回调数组
        let reslove = (value)=>{
            if(this.status === PENDING){
                this.value = value;
                this.status = RESLOVED;
                this.onReslovedCbs.forEach(fn=>fn());
            }
            console.log(value)
        };
        let reject = (reason)=>{
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRjectedCbs.forEach(fn=>fn())
            }
            console.log(reason)
        }
        try {
            executor(reslove,reject); // 立即执行器
        } catch (error) {
            console.log(error);
            reject(error)
        }
        
    }
    // 每次then 后 还是Promise
    then(onFulfilled,onRejected) {
        let Promise2 = new Promise((reslove,reject)=>{
            if(this.status === RESLOVED){
                let x = onFulfilled(this.value);
                reslove(x)
            }
            if(this.status === REJECTED){
                let y = onRejected(this.reason);
                reslove(y)
            }
            if(this.status === PENDING){
                this.onReslovedCbs.push(()=>{
                    // todo...
                    onFulfilled(this.value)
                })
                this.onRjectedCbs.push(()=>{
                    // todo...
                    onRejected(this.reason)
                })
            }
        })
        return Promise2;
    }
}
module.exports = Promise;