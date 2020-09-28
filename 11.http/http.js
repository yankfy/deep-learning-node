const http = require('http');
const url = require('url');

// hostname 主机名
// query 查询参数
// pathname 请求路径

let server = http.createServer((req,res)=>{
    // req 请求 res 响应

})

server.listen(3000,()=>{
    console.log(`server start`);
})

server.on('error',()=>{
    console.log(`server error`);
})

server.on('close',()=>{
    console.log(`server close`);
})
