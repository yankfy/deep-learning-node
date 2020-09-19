const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFufilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const reslove = (value) => {
            if (value instanceof Promise) {
                return value.then(reslove, reject);
            }
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFufilledCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(reslove, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFufilled, onReject) {
        onFufilled = typeof onFufilled === 'function' ? onFufilled : v => v;
        onReject = typeof onReject === 'function' ? onReject : err => {
            throw err
        };
        let newPromise = new Promise((reslove, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.value);
                        reslovePromise(x, newPromise, reslove, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onReject(this.value);
                        reslovePromise(x, newPromise, reslove, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.onFufilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.value);
                            reslovePromise(x, newPromise, reslove, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(this.value);
                            reslovePromise(x, newPromise, reslove, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                })
            }
        })
        return newPromise;
    }
    catch (errCallback) {
        return this.then(null, errCallback);
    }
    static reslove(value) {
        return new Promise((reslove, reject) => {
            reslove(value);
        })
    }
    static reject(reason) {
        return new Promise((reslove, reject) => {
            reject(reason);
        })
    }
}

const reslovePromise = function (x, newPromise, reslove, reject) {
    if (x === newPromise) {
        reject(new TypeError('TypeError'));
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            if (typeof x.then === 'function') {
                x.then.call(x, yes => {
                    if (called) return
                    called = true
                    reslovePromise(yes, newPromise, reslove, reject);
                }, no => {
                    if (called) return
                    called = true
                    reject(no)
                })
            } else {
                if (called) return
                called = true
                reslove(x);
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error);
        }
    } else {
        reslove(x);
    }
}


Promise.prototype.finally = (callbacks) => {
    return this.then((value) => {
        return new Promise(callbacks()).then(() => value)
    }, reason => {
        return new Promise(callbacks()).then(() => {
            throw reason
        })
    })
}

Promise.all = function (promises) {
    if (!Array.isArray(promises)) {} else {
        return new Promise((resolve, reject) => {
            let resolveCounter = 0;
            let length = promises.length;
            let resolveValue = Array(length);
            promises.forEach((i, index) => {
                if (typeof i.then === 'function') {
                    i.then((data) => {
                        resolveValue[index] = data;
                        resolveCounter++
                        if (resolveCounter === length) {
                            return resolve(resolveValue)
                        }
                    }, reject)
                } else {
                    resolveValue[index] = i;
                    resolveCounter++
                    if (resolveCounter === length) {
                        return resolve(resolveValue)
                    }
                }

            })
        })
    }
}

Promise.race = (promises) => {
    if (!Array.isArray(promises)) {} else {
        return new Promise((resolve, reject) => {
            promises.forEach((i, index) => {
                if (typeof i.then === 'function') {
                    i.then(resolve, reject)
                } else {
                    resolve(i)
                }

            })
        })
    }
}

Promise.allSettled = function (promises) {
    if (!Array.isArray(promises)) {} else {
        return new Promise((resolve, reject) => {
            let resolveCounter = 0;
            let length = promises.length;
            let resolveValue = Array(length);
            promises.forEach((i, index) => {
                if (typeof i.then === 'function') {
                    i.then((data) => {
                        console.log(data)
                        resolveValue[index] = data;
                        resolveCounter++
                        if (resolveCounter === length) {
                            return resolve(resolveValue)
                        }
                    }, (error) => {
                        resolveValue[index] = error;
                        resolveCounter++
                        if (resolveCounter === length) {
                            return resolve(resolveValue)
                        }
                    })
                } else {
                    resolveValue[index] = i;
                    resolveCounter++
                    if (resolveCounter === length) {
                        return resolve(resolveValue)
                    }
                }

            })
        })
    }
}