const fs = require('fs');
const path = require('path');

// fs.rmdirSync('d/f/h')

// 同步删除目录 先序

// 1. 删除文件 fs.unlink()  fs.readdirSync() (读取子目录)
// 2. 获取文件的状态信息 fs.stat() 
// 3. 检查文件是否存在 fs.assess() 
// 4. isFile isDircority

// function rmDirP(dir) {
//     // 先判断传入的是文件还是文件夹
//     let statObj = fs.statSync(dir);
//     if (statObj.isDirectory()) {
//         let dirs = fs.readdirSync(dir);
//         dirs = dirs.map(item =>
//             path.join(dir, item))
//         dirs.forEach(element => {
//             rmDirP(element);
//         });

//         fs.rmdirSync(dir);

//     } else {
//         fs.unlink(dir);
//     }
// }
// rmDirP('d');


// !异步串行删除
// function rmDirS(dir,cb){
//     fs.stat(dir,(err,statObj)=>{
//         if(statObj.isDirectory()){
//             fs.readdir(dir,(err,dirs)=>{ // 读取文件夹 先序
//                 dirs = dir.map(item => path.join(dir,item)); // 读取当前文件夹的内容
//                 let index = 0 // 这个索引每次递归时都会创建一个，代表当前这一层节点的索引
//                 function next(){
//                     if(index === dirs.length) return fs.rmdir(dir,cb())
//                     let current = dirs[index++]
//                     rmDirS(current,next);
//                 }
//                 next()
//             })
//         }else{
//             fs.unlink(dir,cb);
//         }
//     })
// }

// !异步并行删除
function rmDirA() {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => { // 读取文件夹 先序
                dirs = dir.map(item => path.join(dir, item)); // 读取当前文件夹的内容
                if(dirs.length === 0) {
                    fs.rmdir(dir,cb)
                }
                let index = 0;

                function done(){
                    if(++index === dirs.length){
                        fs.rmdir(dir,cb);
                    }
                }
                for(let i=0;i<dirs.length;i++){
                    let dir = dirs[i];
                    rmDirA(dir,done);
                }
                
            })
        } else {
            fs.unlink(dir, cb);
        }
    })
}