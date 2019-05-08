/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// iteration
var increasingBST = function (root) {
    var stack = [];
    var dummy = new TreeNode(0);
    var p = dummy;
    while (root !== null || stack.length) {
        if (root !== null) {
            stack.push(root);
            root = root.left;
        } else {
            var cur = stack.pop();
            root = cur.right;
            cur.left = null; // TLE
            p.right = cur;
            p = p.right;
        }
    }
    return dummy.right;
};

var increasingBSTRecursive01 = function (root) {
    var dummy = new TreeNode(0);
    var p = dummy;
    var vals = [];
    inorder(root, vals);
    for (var i = 0; i < vals.length; i++) {
        var t = new TreeNode(vals[i]);
        p.right = t;
        p = p.right;
    }
    return dummy.right;
};
var inorder = function (root, vals) {
    if (root === null) {
        return;
    }
    inorder(root.left, vals);
    vals.push(root.val);
    inorder(root.right, vals);
};

// the most efficient way among these 3 ways
// need to cut the left child.
var p;
var increasingBSTRecursive02 = function (root) {
    var dummy = new TreeNode(0);
    p = dummy;
    inorder02(root);
    return dummy.right;
};

function inorder02(node) {
    if (node === null) {
        return;
    }
    inorder02(node.left);
    p.right = node;
    node.left = null;
    p = p.right;
    inorder02(node.right);
}