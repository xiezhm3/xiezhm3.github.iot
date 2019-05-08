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
 */
var maxDepth = function (root) {
    // dfs
    if (root == null) {
        return 0;
    }
    var max = 0;
    var children = root.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i] !== null) {
            max = Math.max(max, maxDepth(children[i]));
        }
    }
    return max + 1;


    /* bfs
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
    */
    // recursive solution
    if (root == null) {
        return 0;
    }
    var maxDepth = 1;
    var depths = [],
        nodes = [];
    nodes.push(root);
    depths.push(1);
    while (nodes.length) {
        var cur = nodes.pop();
        var depth = depths.pop();
        var children = cur.children;
        if (children && !children.length) {
            maxDepth = maxDepth > depth ? maxDepth : depth;
        }
        for (var i = 0; i < children.length; i++) {
            nodes.push(children[i]);
            depths.push(depth + 1);
        }
    }
    return maxDepth;
};