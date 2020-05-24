const RESLOVED = 'RESLOVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';
console.log('my')
// 简单的Promise
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        let reslove = (value)=>{
            if(this.status === PENDING){
                this.value = value;
                this.status = RESLOVED;
            }
            console.log(value)
        };
        let reject = (reason)=>{
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
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
    then(onFulfilled,onRejected) {
        if(this.status === RESLOVED){
            onFulfilled(this.value);
        }
        if(this.status === REJECTED){
            onRejected(this.reason);
        }
    }
}
module.exports = Promise;