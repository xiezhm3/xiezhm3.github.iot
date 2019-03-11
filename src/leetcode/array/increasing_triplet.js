/**
    给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。

    数学表达式如下:
    如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
    使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。

    说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  if (!nums || nums.length < 3) {
    return false;
  }
  var len = nums.length;
  var result = false;
  var m = 2147483647,
    n = 2147483647; // js max number
  for (var i = 0; i < len; i++) {
    if (m >= nums[i]) {
      m = nums[i];
    } else {
      if (n >= nums[i]) {
        // find the number larger then m
        n = nums[i];
      } else {
        // if number larger then n, return true
        result = true;
        break;
      }
    }
  }
  return result;
};
