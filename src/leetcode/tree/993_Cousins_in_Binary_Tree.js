/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    var queue = [];
    queue.push(root);
    var a = false,
        b = false;
    while (queue.length) {
        var size = queue.length;
        if (a !== b) {
            return false;
        }
        for (var i = 0; i < size; i++) {
            var cur = queue.shift();
            if (cur.val === x) {
                a = true;
            }
            if (cur.val === y) {
                b = true;
            }
            if (cur.left !== null && cur.right !== null) {
                if (cur.left.val === x && cur.right.val === y) {
                    return false;
                }
                if (cur.right.val === x && cur.left.val === y) {
                    return false
                }
            }
            if (cur.left !== null) {
                queue.push(cur.left);
            }
            if (cur.right !== null) {
                queue.push(cur.right);
            }
        }
        if (a && b) {
            return true;
        }
    }
    return false;
};