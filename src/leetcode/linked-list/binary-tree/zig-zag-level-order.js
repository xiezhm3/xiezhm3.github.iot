/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (!root) {
    return [];
  }
  var s1 = [],
    s2 = [],
    result = [];
  var c = root;
  s1.push(root);
  while (s1.length > 0 || s2.length > 0) {
    var tmp = [];
    while (s1.length > 0) {
      c = s1.pop();
      tmp.push(c.val);
      if (c.left !== null) {
        s2.push(c.left);
      }
      if (c.right !== null) {
        s2.push(c.right);
      }
    }
    result.push(tmp);
    tmp = [];
    while (s2.length > 0) {
      c = s2.pop();
      tmp.push(c.val);
      if (c.right !== null) {
        s1.push(c.right);
      }
      if (c.left !== null) {
        s1.push(c.left);
      }
    }
    if (tmp.length > 0) {
      result.push(tmp);
    }
  }
  return result;
};
