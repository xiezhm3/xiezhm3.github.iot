### 108. Convert Sorted Array to Binary Search Tree 

[108. Convert Sorted Array to Binary Search Tree ](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

> Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
>
> For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

[solution](../../leetcode/tree/108_Convert_Sorted_Array_to_Binary_Search_Tree.java)

    使用已排序的数组构建height balanced的二叉树。使用递归调用的方式构建二叉树。因为是平衡的，因此每次递归都使用数组中位数。