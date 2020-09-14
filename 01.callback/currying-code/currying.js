// 柯里化函数

// 函数分步传递参数，将函数拆分成功能更具体化的函数

function currying (){
    
}

function isType(typing,content){
    return Object.prototype.toString.call(content) === `[object ${typing}]`;
}

let util = {};

['String','Number','Null','Undefined'].forEach((typing)=>{
    util['is'+typing] = 
})