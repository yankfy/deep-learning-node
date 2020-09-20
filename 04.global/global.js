// 用途：根据不同平台 操作系统文件的 
console.log(process.platform); // win32  windows /  drawin linux   /etc/usr/
// 用途： 可以获取当前执行node命令的目录 ,可以找到当前目录下的某个文件
console.log(process.cwd()); // curren working directory 可以改变的

if(process.env.NODE_ENV === 'production'){
    console.log('生产环境')
}else{
    console.log('开发环境')
}
// console.log(process.env.A); // 当前系统环境变量 

// 用途：运行代码时传入的参数 --port --config 
// 可以获取到当前用户的所有传入参数 -p --port
// 第一个指代的是node的执行文件node.exe 第二个指代的是执行的谁
// let config = process.argv.slice(2).reduce((memo,current,index,arr)=>{ // [--port,3000,--config,xx.js]
//     if(current.startsWith('--')){
//         memo[current.slice(2)] = arr[index+1];
//     }
//     return memo;
// },{})
 // => {port:3000,config:xx.js}
//  console.log(config);
 // commander TJ
 

 const program = require('commander'); // 解析用户传递的参数 
 program.name('pp')
 program.usage('[options]')
 program.command('rm').action(function () {
     console.log('删除')
 })
 program.option('-p, --port <v>','set server port') 
 program.parse(process.argv)