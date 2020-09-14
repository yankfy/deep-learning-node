// 高阶函数
// 函数的参数为一个函数 或者 函数的返回值是一个函数
// AOP 切片编程
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

