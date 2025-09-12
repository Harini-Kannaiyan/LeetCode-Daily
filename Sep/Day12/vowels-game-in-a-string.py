# Time: O(N)  ::  Space: O(1)

class Solution:
    def doesAliceWin(self, s: str) -> bool:
        return any(c in "aeiou" for c in s)