// 柯里化函数

// 函数分步传递参数，将函数拆分成功能更具体化的函数

function currying (fn,arr=[]){ // arr 用来记录参数的个数 和 并记录函数个数的关系
  const length = fn.length;
  return (...args)=>{
    let concatArgs = [...arr,...args];
    if(concatArgs.length < length){
        return currying(fn,concatArgs)
    }else{
        console.log(...concatArgs)
        return fn(...concatArgs)
    }
  }
}

function isType(typing,content){
    return Object.prototype.toString.call(content) === `[object ${typing}]`;
}

let util = {};

['String','Number','Null','Undefined'].forEach((typing)=>{
    util['is'+typing] = currying(isType,[typing])
})

console.log(util.isString('hello'))