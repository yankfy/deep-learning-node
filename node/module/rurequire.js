// 
// 1、掌握node中如何调试代码
// - 直接在浏览器中调试、【调试某些模块】
// - 编辑器中调试 [主要用这种方式]
// - 控制台中调试

// 2、node 调用
// - 调用require
// - Module._load 返回的是 module.exports
// - Module._resloveFilename 解析文件名，将文件名变成绝对路径。
// - Module._cache 默认会判断是否存在缓存
// new Module 创建模块对象 id,exports【重要属性】
// 把模块缓存起来，方便下次使用

// tryModuleLoad 尝试加载模块，
// module.paths 查找第三方模块的路径
// 查找当前模块的扩展名，策略模式

// 获取文件内容
// module._compile 
// 将用户内容包到一个函数中
// 最终返回 module.exports 用户给这个module.exports 进行复制

const path = require('path');
const fs = require('fs');
const vm = require('vm');


function Module(id) {
    console.log(id)
    this.id = id;
    this.exports = {};
    // return module.exports 构造函数不能return，
    // return 会导致报错
}

Module._resloveFilename = function (filePath) {
    // 判断当前文件是否存在
    filePath = path.resolve(__dirname, filePath)
    let exist = fs.existsSync(filePath);
    if (exist) return filePath
    // 尝试添加后缀

    let keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
        let currentPath = filePath + keys[i];
        if (fs.existsSync(currentPath)) return currentPath
    }
    throw new Error('模块不存在');
}
Module.warp = function (content) {
    return `(function(exports,require,module,__filename,__dirname){`
        +content +
        `})`
}

Module._extensions = {
    '.js': function (module) {
        console.log('js module')
        let content = fs.readFileSync(module.id, 'utf8');
        let fnStr = Module.warp(content);
        // 讲fnStr 换成 js
        let fn = vm.runInThisContext(fnStr);
        let exports = module.exports;
        let __filename = module.id;
        let __dirname = path.dirname(module.id);
        //  
        fn.call(exports, exports, require, module, __filename, __dirname)
    },
    '.json': function (module) {
        console.log('json module')
        let content = fs.readFileSync(module.id);
        module.exports = JSON.parse(content);
    }
}

Module.prototype.load = function (__filename) {
    // 获取文件的后缀来加载
    let extname = path.extname(__filename);
    Module._extensions[extname](this)
}

Module._load = function (filePath) {
    try {
        // 把路径转换成绝对路径
        let __filename = Module._resloveFilename(filePath);
        let module = new Module(__filename)
        module.load(__filename);
        return module.exports;
    } catch (error) {
        throw new Error(error)
    }
}

function myRequire(filePath) {
    // 根据路径加载这个模块
    return Module._load(filePath)
}

let r = myRequire('./a')
console.log(r)