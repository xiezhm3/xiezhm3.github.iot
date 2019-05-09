// /**
//  * Definition for a binary tree node.
//  * public class TreeNode {
//  *     int val;
//  *     TreeNode left;
//  *     TreeNode right;
//  *     TreeNode(int x) { val = x; }
//  * }
//  */
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) {
            return null;
        }
        return generateBST(nums, 0, nums.length - 1);
    }

    public TreeNode generateBST(int[] nums, int l, int h) {
        if (l > h) {
            return null;
        }
        int mid = l + (h - l) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = generateBST(nums, l, mid - 1);
        node.right = generateBST(nums, mid + 1, h);
        return node;
    }
}