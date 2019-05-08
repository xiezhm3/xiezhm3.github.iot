/**
 * Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

For example, given a 3-ary tree:

 


 

We should return its max depth, which is 3.

 
 */





/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 * BFS
 */
var maxDepth = function (root) {
    if (root == null) {
        return 0;
    }
    var depth = 0;
    var queue = [];
    queue.push(root);
    while (queue.length) {
        var size = queue.length;
        for (var i = 0; i < size; i++) {
            var current = queue.shift();
            current.children && current.children.forEach(function (child) {
                queue.push(child);
            });
        }
        depth++;
    }
    return depth;
};