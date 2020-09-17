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

## 柯里化函数
```js
const currying = (fn,args = []) => {
    let len = fn.length;
    return (..._)=>{
        let arg = args.concat(_);
        if(arg.length < len){
            return currying(fn,arg);
        }
        return fn(...arg);
    }
};
const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};
let r = currying(add)(1)(2,3)(4,5);
console.log(r);
```

## 发布订阅模式 、 观察者模式
一种一对多的关系，发布者和订阅者是否有关联，观察者模式基于发布订阅模式