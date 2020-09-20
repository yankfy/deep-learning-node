let fs = require('fs').promises; // async + await === ganertor + co
function co(it) { // 异步迭代采用函数的方式  语法
    return new Promise((resolve, reject) => {
        function step(data) {
            let { value, done } = it.next(data);
            if (!done) {
                Promise.resolve(value).then((data)=>{
                    step(data)
                },reject); // 失败就失败了
            } else {
                resolve(value); // 将最终的结果抛出去
            }
        }
        step();
    })
}
function* read() { // switch - case => babel编译后就是把一个函数分成多个case 采用指针的方式向下移动
    let name = yield fs.readFile('name.txt', 'utf8'); // => 返回结果
    let age = yield fs.readFile(name, 'utf8');
    return age;
}
co(read()).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})

// let it = read();
// let {value,done} = it.next() // 传参没有意义
// value.then(data=>{
//    let {value,done} = it.next(data); // 这里传入的参数会作为上一次yield的返回值
//    value.then(data=>{
//        let {value,done} = it.next(data);
//        console.log(value);
//    })
// })


const fs = require('fs').promises
async function read() { // switch - case => babel编译后就是把一个函数分成多个case 采用指针的方式向下移动
    let name = await fs.readFile('name.txt', 'utf8'); // => 返回结果
    let age = await fs.readFile(name, 'utf8');
    return age;
}

// async 方法执行后返回的是一个promise
read().then(data=>{
    console.log(data);
})

// async + await 是genrator的语法糖


// promise 必须要掌握 promise.allSettled