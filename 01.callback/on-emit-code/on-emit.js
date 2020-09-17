let styleWeb = {
    _arr : [],
    on(fn){
        this._arr.push(fn)
    },
    emit:function(){
        this._arr.forEach(fn => fn());
    }
}

styleWeb.on(()=>{
    console.log('learn h5')
})

styleWeb.on(()=>{
    console.log('learn css')
})

styleWeb.on(()=>{
    console.log('learn js')
})

styleWeb.emit(); // 发布