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

# 浏览器事件环
## 1.浏览器的进程
- 每一个页卡都是进程 (互不影响)

- 浏览器也有一个主进程 (用户界面)

- 渲染进程 每个页卡里 都有一个渲染进程 (浏览器内核)

- 网络进程 （处理请求）

- GPU进程 3d绘制

- 第三方插件的进程

## 2. 渲染进程（包含着多个线程）
- GUI渲染线程 （渲染页面的）

- js引擎线程 他和页面渲染时互斥

- 事件触发线程 独立的线程 EventLoop

- 事件 click、setTimeout、ajax也是一个独立线程



## 3.宏任务,微任务
- 宏任务 宿主环境提供的异步方法 都是宏任务 script ui 渲染

- 微任务 语言标准提供promise mutationObserver

## 4.微任务和GUI渲染
```js
<script>
        document.body.style.background = 'red';
        console.log(1)
        Promise.resolve().then(()=>{
            console.log(2)
            document.body.style.background = 'yellow';
        })
        console.log(3);
</script>
```
## 5.事件任务
```js
<script>
        button.addEventListener('click',()=>{
            console.log('listener1');
            Promise.resolve().then(()=>console.log('micro task1'))
        })
        button.addEventListener('click',()=>{
            console.log('listener2');
            Promise.resolve().then(()=>console.log('micro task2'))
        })
        button.click(); // click1() click2()
</script>
```
## 6.定时器任务
```js
<script>
        Promise.resolve().then(() => {
            console.log('Promise1')
            setTimeout(() => {
                console.log('setTimeout2')
            }, 0);
        })
        setTimeout(() => {
            console.log('setTimeout1');
            Promise.resolve().then(() => {
                console.log('Promise2')
            })
        }, 0);
</script>
```