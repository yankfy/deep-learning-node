# 手写Promise

# Promise有哪些缺点？
fetch 无法中断，但是可以丢弃本次请求 依然是基于回调的方式，好处可以扁平化处理我们的逻辑，处理错误比较方便

# Promise超时中断如何实现
```js
function wrap(p1){
    let abort;
    let p2 = new Promise((resolve,reject)=>{
        abort = function(){
            reject('失败');
        }
    });
    let p =  Promise.race([p1,p2]);
    p.abort = abort;
    return p;
}
let p = wrap(new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve();  
    }, 3000);
}))
p.then(()=>{},()=>{console.log('失败')})
p.abort();
```

# Promise.all
Promise.all可以解决异步并发问题，并且返回的结果按照调用的顺序进行存储。全部成功后才成功否则执行失败逻辑

# Promise.race
race只采用第一个成功或者失败的结果