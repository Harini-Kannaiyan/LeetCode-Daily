class Solution:
    # Time: O(N) | Space: O(N)
    def getDecimalValue(self, head: Optional[ListNode]) -> int:
        p1 = head
        values = []
        while p1:
            values.append(p1.val)
            p1 = p1.next
        
        currVal = 0
        for val in values:
            currVal = 2*currVal +val
        return currVal

        

class Solution:
    # Time: O(N) | Space: O(1)
    def getDecimalValue(self, head: ListNode) -> int:
        currVal = 0
        while head: 
            currVal = 2*currVal + head.val 
            head = head.next 
        return currVal    