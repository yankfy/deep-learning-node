// 实现一个自定义模板引擎
// ! 原生的
// const ejs = require('ejs') // ejs 属于第三方模块 解析文件内容
const path = require('path');
// ejs.renderFile(path.resolve(__dirname,'template.html'),{name:'zf',aga:11},(err,data)=>{
//     console.log(data);
// })
// ! 手写
const fs = require('fs');
const renderFile = (filePath,obj,cb)=>{
    fs.readFile(filePath,'utf8',(err,html)=>{
        if(err) return cb(err,html)
        // html = html.replace(/(\{\{([^}]+)\}\})/g,()=>{
        //     // console.log(arguments)

        //     let obj = arguments[1].trim();
        //     return '${'+key+'}'
        //     // console.log(obj)
        //     // return obj[key]
        // })
        html = html.replace(/\{\{([^}]+)\}\}/g,function () { // RegExp.$1
            let key = arguments[1].trim();
            return '${'+key+'}' // {{name}} => ${name}  
        });
        // cb(err,html)
        let head = `let str = '';\r\n with(obj){\r\n`
        head+='str+=`';
        html = html.replace(/\{\%([^%]+)\%\}/g,function (){
            return '`\r\n' + arguments[1] +'\r\nstr+=`\r\n'
        })
        let tail = '`}\r\n return str;';
        // let head = `let str = '';\r\n with(obj){\r\n`;
        // head += 'str+=`'
        // html = html.replace(/\{\%([^%]+)\%\}/g,function () {
        //     return '`\r\n'+arguments[1] + '\r\nstr+=`\r\n'
        // })
        // let tail = '`}\r\n return str;'
        let fn = new Function('obj',head + html + tail)
        cb(err,fn(obj));
        // console.log(head+html+tail);

        // let fn = new Function('obj',head+html+tail);
        // console.log(fn)
        // cb(err,fn(obj));
        
    })
}

// 1、把字符串中的{%%} 去掉，匹配出新的字符串，然后用new Function，with作用域
renderFile(path.resolve(__dirname,'template.html'),{name:'ww',age:32,arr:[1,2,3]},(err,data)=>{
    console.log(data)
})