// yield 表示的是产出 * generator函数 （迭代器函数）
// function* gen() { // 根据指针向下执行 + switch-case来实现
//     yield 1
//     yield 2
//     yield 3
//     return 100;
// }

function gen$(context) {
    switch (context.prev = context.next) {
        case 0:
            context.next = 1;
            return 1
        case 1:
            context.next = 2;
            return 2
        case 2:
            context.next = 3;
            return 3
        case 3:
            context.stop();
            return 100
    }
}
let gen = function() {
    const context = {
        prev: 0, // 当前要运行的
        next: 0, // 下一次要运行的
        done: false, // 是否完成运行
        stop() {
            this.done = true; // 更改完成状态
        }
    }
    return {
        next() {
            return {
                value: gen$(context), // 将上下文传入
                done: context.done
            }
        }
    }
}


let it = gen();
console.log(it.next());