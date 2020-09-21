function EventEmitter(){
    this._events = {}
}
// 订阅
EventEmitter.prototype.on = function (eventName,callback) {
    if(!this._events){
        this._events = Object.create(null);
    }
    //  当前绑定的事件 不是newListener事件就触发newListener事件
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName)
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback)
    }else{
        this._events[eventName] = [callback]
    }
}
// 发布
EventEmitter.prototype.emit = function (eventName,...args) {
    if(!this._events) return
    if(this._events[eventName]){
        this._events[eventName].forEach(fn=>fn(...args))
    }
}
// 绑定一次
EventEmitter.prototype.once = function (eventName,callback) {
    const once = (...args) =>{
        callback(...args);  
        // 当绑定后将自己移除掉
        this.off(eventName,once);
    }
    once.l = callback; // 用来标识这个once是谁的
    this.on(eventName,once)
}
// 删除
EventEmitter.prototype.off = function (eventName,callback) {
    if(!this._events) return
    this._events[eventName] = this._events[eventName].filter(fn=>((fn !== callback) && (fn.l!=callback)))
}
module.exports = EventEmitter 


// 是让一个类继承EventEmitter原型上的方法 
// Object.create()  Girl.prototype.__proto__ = EventEmitter.prototype  Object.setPrototypeof  exnteds

// 1.每个实例都有一个__proto__ 指向所属类(构造函数)的原型
// 2.每个类都有一个prototype属性，上面有个contructor属性指向类的本身

// Girl.prototype = Object.create(EventEmitter.prototype) 
// Girl.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Girl.prototype ,EventEmitter.prototype)

// util.inherits(Girl, EventEmitter); // 继承原型上的方法