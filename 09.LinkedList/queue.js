// 链表查找 删除的性能平均复杂度是O(n) 链表可以优化头尾操作比较合适
// 可以使用链表来实现 栈 或者队列

let LinkedList = require('./linkedList');
class Queue{ // 队列是添加和删除
    constructor(){
        this.ll = new LinkedList();
    }
    offer(element){ // 入队列
        this.ll.add(element);
    }
    poll(){
        return this.ll.remove(0);
    }
}
module.exports = Queue;
