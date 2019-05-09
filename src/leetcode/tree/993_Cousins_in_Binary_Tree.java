//
// Definition for a binary tree node.
// public class TreeNode {
//    int val;
//     TreeNode left;
//    TreeNode right;
//    TreeNode(int x) { val = x; }
//}
//
class Solution {
    Map<Integer, Integer> depths;
    Map<Integer, TreeNode> parents;

    public boolean isCousins(TreeNode root, int x, int y) {
        depths = new HashMap();
        parents = new HashMap();
        dfs(root, null);
        return depths.get(x) == depths.get(y) && parents.get(x) != parents.get(y);
    }

    public void dfs(TreeNode node, TreeNode parent) {
        if (node == null) {
            return;
        }
        depths.put(node.val, parent != null ? depths.get(parent.val) + 1 : 0);
        parents.put(node.val, parent);
        dfs(node.left, node);
        dfs(node.right, node);
    }
}