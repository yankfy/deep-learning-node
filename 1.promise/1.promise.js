// promise 有三个状态 成功reslove 失败reject 等待pending

// promise 写法就是一个类
let Promise = require('./easy_promise.js');
let promise = new Promise((reslove,reject)=>{
    // console.log('1');
    reslove('a');
    // reject('b');
})
// 默认是pendig reslove('成功原因') reject("失败原因")
// 默认执行器立即执行
// promise的实例都拥有一个then方法，一个参数是成功回调，一个参数是失败回调
// 如果promise 回调异常,也会发生失败。
promise.then((data)=>{
    console.log('reslove',data);
},(err)=>{
    console.log('reject',err)
})
// 如果promise 一旦成功就不能失败 一旦失败就不能成功,只能等待才能更改状态