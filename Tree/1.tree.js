// 时间复杂度 数据完整遍历 0(n)
// 二分查找 只查找一般 Olog(n);

// 树的增删查改比数组高很多
// 二叉树 和 多叉树 【常考二叉树】
// 度的概念？【子树的个数称之为度】

// 实现二叉搜索树
class Node {
    // parent 是树中重要的属性
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BST {
    // 树的查找无法通过索引
    constructor(compare) {
        this.root = null;
        this.size = 0;
        this.compare = compare || this.compare;
    }
    compare(e1, e2) {
        return e1 - e2;
    }
    add(element) {
        if (this.root === null) {
            this.root = new Node(element, null);
            this.size++;
        } else {
            // 增加的不是根节点
            // 递归 或 循环

            let currentNode = this.root; // 先考虑两个
            let compare = 0;
            let parent = null;
            while (currentNode) {
                parent = currentNode;
                compare = this.compare(element, parent.element);
                if (compare > 0) {
                    currentNode = currentNode.right;
                } else {
                    currentNode = currentNode.left;
                }
            }
            // 获取循环后的 parent;
            if (compare > 0) {
                parent.right = new Node(element, parent)
            } else {
                parent.left = new Node(element, parent)
            }
        }
    }
    preTraversal() {
        const traversal = (node) => {
            if (node) {
                console.log(node.element);
                traversal(node.left);
                traversal(node.right);
            } else {
                return;
            }
        }
        traversal(this.root);
    }
    inorderTraversal(visitor) {
        if (visitor === null) return
        const traversal = (node) => {
            if (node) {
                traversal(node.left);
                console.log(node.element);
                traversal(node.right);
                visitor.visit(node);
            } else {
                return;
            }
        }
        traversal(this.root);
    }
    leverOrderTravelsal(visitor) {
        if (this.root === null || visitor == null) return
        let stack = [this.root]; // 根节点放入到队列中
        // console.log(stack);
        let index = 0;
        let currentNode = null;
        while (currentNode = stack[index++]) {
            visitor.visit(currentNode);
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                {
                    stack.push(currentNode.right)
                }
            }
        }
    }
    inverstTree() {
        if (this.root === null) return
        let stack = [this.root]; // 根节点放入到队列中
        // console.log(stack);
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
        return this.root;
    }
}

// let bst = new BST((e1, e2) => {
//     // 自定义比较器
//     return e1.age - e2.age;
// });
let bst = new BST();
// let arr = [10,8,19,6,15,22,20]
let arr = [10, 8, 19, 6, 15, 22, 20]
arr.forEach(element => {
    bst.add(element)
});
// console.dir(bst.root, {
//     depth: 200
// })

// 遍历方式 四种
// bst.inorderTraversal({
//     visit(node){
//         console.log(node)
//     }
// })

// 层序遍历
// bst.leverOrderTravelsal({
//     visit(node) {
//         console.log(node)
//     }
// })
console.dir(bst.inverstTree(), {
    depth: 200
});