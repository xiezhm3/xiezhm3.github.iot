/**
 * 给定一个二叉树，返回它的 中序 遍历。
 * @param {*} root
 */

var inorderTraversal = function(root) {
  // corner case
  if (!root) {
    return [];
  }
  var stack = [],
    result = [];

  while (stack.length > 0 || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      result.push(root.val);
      root = root.right;
    }
  }
};
