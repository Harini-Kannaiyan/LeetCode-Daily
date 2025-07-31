# Time: O(N * LogW)  ::  Space: O(N)

class Solution(object):
    def subarrayBitwiseORs(self, arr):
        ans = set()
        cur = {0}
        for x in arr:
            cur = {x | y for y in cur} | {x}
            ans |= cur
        return len(ans)
