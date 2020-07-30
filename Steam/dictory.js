// fs 是文件系统
// 文件夹删除操作 rm -rf 'xxx'

// const fs = require('fs');
const fs = require('fs').promises;

async function mkDirA(paths) {
    try {
        let pathArr = paths.split('/');
        for (let i = 1; i < pathArr.length; i++) {
            let currentPath = pathArr.slice(0, i).join('/');
            // 如果文件夹存在，就不能穿件
            // if (!fs.existsSync(currentPath)) {
            //     fs.mkdirSync(currentPath)
            // }
            try {
                await fs.access(currentPath); // 回调不支持 try catch  
            } catch (error) {
                await fs.mkdir(currentPath)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
mkDirA('d/f/h/t');

// console.log(fs);
// 同步代码容易，异步代码难写

// 创建目录时要保证父路径存在
// mkDirP('/a/b/c');
// function mkDirP(paths){
//     let pathArr = paths.split('/');
//     for(let i=1;i<pathArr.length;i++){
//         let currentPath = pathArr.slice(0,i).join('/');
//         // 如果文件夹存在，就不能穿件
//         if(!fs.existsSync(currentPath)){
//             fs.mkdirSync(currentPath)
//         }
//     }
// }

// mkDirS('/e/f/g',()=>{
//     console.log('创建异步文件夹')
// })

// function mkDirS(paths,cb){
//     let arr = paths.split('/');
//     let index = 0;
//     function next(){
//         if(index === arr.length) return cb();
//         // 如果路径不存在就停止创建
//         let currentPath = arr.slice(0,++index).join('/');
//         fs.access(currentPath,err=>{
//             if(err){
//                 fs.mkdir(currentPath,()=>{
//                     // 当前创建完毕后，继续创建下一个
//                     next()
//                 })
//             }else{
//                 next();
//             }
//         })
//     }
//     next()
// }