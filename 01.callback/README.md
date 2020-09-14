# 关于函数
什么是高阶函数： 把函数作为参数或者返回值的一类函数。

## before函数
```js
Function.prototype.before = function(callbacks) {
    return (...args)=>{
        callbacks();
        this(...args);
    }
}

function say(a,b,c,d){
    console.log(a,b,c,d);
}

let newSay = say.before(()=>{
    console.log('说话前')
})

newSay(1,2,3,4)
```
AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一层，不用管原函数内部实现