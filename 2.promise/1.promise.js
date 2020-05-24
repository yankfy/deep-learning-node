// promise 有三个状态 成功reslove 失败reject 等待pending

// promise 写法就是一个类
let Promise = require('./2.promise.js');
let promise = new Promise((reslove,reject)=>{
    setTimeout(()=>{
        reslove("成功");
    },1000)
})

// 如果当前是PENDING，需要讲回调保存，状态稍后调用

promise.then((data)=>{
    console.log('reslove',data);
},(err)=>{
    console.log('reject',err)
})

