// 二叉遍历树

class Node { // 节点直接必须有一个parent
    constructor(element, parent) {
        this.element = element;
        this.parent = parent; // 记录当前节点的父亲时谁
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor(){
        this.root = null;
        this.size = 0;
    }

    add(element){
        if(this.root == null){
            this.root = new Node(element,null);
            this.size++;
            return
        }else{
            let currentNode = this.root;
            let parent = null;
            let compare = null;
            while (currentNode) {
                compare = element - currentNode.element;
                parent = currentNode;
                if(compare > 0 ){
                    currentNode = currentNode.right;
                }else if(compare < 0){
                    currentNode = currentNode.left;
                }
            }
            let newNode = new Node(element,parent);
            if(compare>0){
                parent.right = newNode;
            }else if(compare <0){
                parent.left = newNode;
            }
            this.size++;
        }
    }
    // 前序遍历
    preorderTraversal(vistor) {
        const traversal = (node) => {
            if (node == null) return;
            vistor.visit(node)
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root)
    }
    // 前序遍历
    inorderTraversal(vistor) {
        const traversal = (node) => {
            if (node == null) return;
            traversal(node.left);
            vistor.visit(node)
            traversal(node.right);
        }
        traversal(this.root)
    }
     // 根据parent属性  一般情况下 都可以用栈形结构 去避免递归
     postOrderTraversal(vistor) {
        const traversal = (node) => {
            if (node == null) return;
            traversal(node.left);
            traversal(node.right);
            vistor.visit(node)
        }
        traversal(this.root)
    }
    // 层序遍历
    levelOrderTraversal(visitor) {
        if (this.root == null) return;
        let stack = [this.root]; // 10
        let index = 0;
        let currentNode = null;
        while (currentNode = stack[index++]) {
            visitor.visit(currentNode)
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
     // 左右互换 树的遍历  二叉树翻转 等于层序遍历 + temp 翻转
     invertTree(){
        if (this.root == null) return;
        let stack = [this.root]; // 10
        let index = 0;
        let currentNode = null;
        while (currentNode = stack[index++]) {
            let temp = currentNode.left;
            currentNode.left = currentNode.right;
            currentNode.right = temp;

            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
}

let bst = new BST();
let arr = [10, 8, 19, 6, 15, 22, 20];
arr.forEach(item => {
    bst.add(item)
})
// 访问者模式
bst.preorderTraversal({ // babel 内部转化都是使用这种方式
    visit(node) {
        console.log(node.element, '----');
    }
});

bst.inorderTraversal({ // babel 内部转化都是使用这种方式
    visit(node) {
        console.log(node.element, '+++++');
    }
});

// 二叉搜索树中的内容必须是有可比较性的
