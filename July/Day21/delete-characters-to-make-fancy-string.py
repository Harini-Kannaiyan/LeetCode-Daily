class Solution:
    # Time: O(N) :: Space: O(N)
    def makeFancyString(self, s: str) -> str:
        prev = ''
        frequency = 0
        newStr = ''
        for i, ch in enumerate(s):
            if ch == prev:
                frequency+=1
            else:
                prev = s[i]
                frequency = 1
            if frequency < 3:
                newStr+=ch
        return newStr


class Solution:
    # Time: O(N) :: Space: O(1)
    def makeFancyString(self, s: str) -> str:
        s = list(s)
        j = 2
        for i  in range(2, len(s)):
            if s[i] != s[j-1] or s[i] != s[j-2]:
                s[j] = s[i]
                j+=1
             
        
        return "".join(s[:j])

        