/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// dfs recursive
// O(n)
var number = 0;
var count = 0;
var kthSmallest = function(root, k) {
  count = k;
  helper(root);
  return number;
};
function helper(root) {
  if (root.left !== null) {
    helper(root.left);
  }
  count--;
  if (count === 0) {
    number = root.val;
    return;
  }
  if (root.right !== null) {
    helper(root.right);
  }
}
// non-recursive

kthSmallest = function(root, k) {
  var st = [];
  while (root) {
    st.push(root);
    root = root.left;
  }
  while (k !== 0) {
    var node = st.pop();
    k--;
    if (k === 0) {
      return node.val;
    }
    var right = node.right;
    while (right) {
      st.push(right);
      right = right.left;
    }
  }
  return -1;
};

// binary search

kthSmallest = function(root, k) {
  var count = countNodes(root.left);
  if (count >= k) {
    return kthSmallest(root.left, k);
  } else if (k > count + 1) {
    return kthSmallest(root.right, k - 1 - count);
  }
  return root.val; // when count + 1 === k
};
