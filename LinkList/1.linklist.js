class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
/**
 * add(index,element)  指定索引添加元素 
 * add(element)  直接添加元素
 * get(index)  获取指定索引元素
 * set(index,element) 修改指定索引节点内容
 * remove(index) 删除指定索引节点
 * clear() 清空链表 
 * 
 */
class LinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
    }
    _node(index) {
        if (index < 0 || index >= this.size) throw new Error('越界');
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) throw new Error('越界');
        if (index === 0) {
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._node(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }
    get(index) {
        return this._node(index);
    }
    set(index, element) {
        let node = this._node(index);
        node.element = element;
        return node;
    }
    remove(index) {
        if (index < 0 || index >= this.size) throw new Error('越界');
        if (index === 0) {
            this.head = this.head.next;
        }else{
            let prevNode = this._node(index - 1);
            prevNode.next = prevNode.next.next;
        }
        this.size --;
    }
    reverseListBad(){
        function reverse(head){
            // 如果没有元素，或者后面没有元素，就不再反转
            if(head===null || head.next === null){
                return head;
            }
            // 先交换下一个。
            let newHead = reverse(head.next);
            head.next.next = head;
            head.next= null;
            // console.log(head);
            return newHead;
            // return head;
        }
        this.head = reverse(this.head);
        return this.head;   
    }
    reverseListGood(){
        let head = this.head; // 获取原来的第一个元素
        if(head === null || head.next === null){ // 处理临界条件
            return head;
        }
        let newHead = null;
        while(head !==null){
            let temp = head.next; // 先保留下一个
            head.next = newHead; // head -> null
            newHead = head; // newHead -> head
            head = temp; // head->head.next
        }
        this.head = newHead;
        return this.head;

    }
    clear() {
        this.size = 0;
        this.head = null;
    }
}

let ll = new LinkedList();
ll.add(1);
ll.add(2);
// ll.add(3);
// ll.add(4);
console.log(ll)
// console.log(ll.reverseListBad())
console.log(ll.reverseListGood())