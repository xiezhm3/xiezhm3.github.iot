// i: 1->2->3->4->5->NULL
// o: 1->3->5->2->4->NULL
// o(n) o(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (!head || !head.next) {
    return head;
  }
  var odd = head,
    ehead = head.next,
    even = ehead;
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = ehead;
  return head;
};
