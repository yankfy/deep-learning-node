const fs = require('fs');
const path = require('path');

// 创建文件夹
fs.mkdir('a/b', (err) => {
    console.log(err)
});

// 删除文件夹
fs.rmdir('/a', (err) => {
    console.log(err)
}); // 删除文件要保证文件夹是空的

// 删除文件夹下的文件
fs.readdir('a', (err, dirs) => {
    dirs = dirs.map(item => {
        let p = path.join('a', item);
        fs.stat(p, function (err, stat) { // 如果文件不存在就报错
            console.log(stat.isDirectory());
            if (stat.isFile()) {
                fs.unlink(p, () => {});
            }
        })
        return p
    })
})

// 删除文件夹
function rmdir(dir,cb){ // 用我们的层序遍历来实现删除操作
    fs.stat(dir,(err,statObj)=>{
        if(statObj.isFile()){
            fs.unlink(dir,cb);
        }else{ // Promise.all
            // 读取文件夹中的内容 
            fs.readdir(dir,(err,dirs)=>{
                dirs = dirs.map(item=>path.join(dir,item));
                // 先删除 儿子 在删除老子
                // 并发删除多个儿子 而删除完毕 通知父亲
                if(dirs.length == 0){
                     return fs.rmdir(dir,cb);
                }
                let idx = 0;
                function done(){
                    if(++idx == dirs.length){
                        fs.rmdir(dir,cb);
                    }
                }
                for(let i = 0; i < dirs.length;i++){
                    let dir = dirs[i];
                    rmdir(dir,done)
                }
            })
        }
    });
}
// 文件夹放的有什么内容

// 主要方法
// fs.mdir fs.rmdir  fs.readdir(一层)  fs.stat() isFile isDirectory   fs.unlink 删除文件操作