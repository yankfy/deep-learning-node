let fs = require('fs');

// 异步方法无法通过try catch 捕获状态

function read(filename){
    return new Promise((reslove,reject)=>{
        fs.readFile
    })
}

read('./name.txt').then(data=>{
    console.log(data)
})
