#TC: 2^t , t is the power 1, 2, 3,

class Solution:
    def kthCharacter(self, k: int) -> str:
        prevString = 'a'
        while len(prevString) < k:
            size = len(prevString)
            currString =''
            for ch in prevString:
                nextChar = chr(ord('a') + ((ord(ch) - ord('a') + 1) % 26))
                currString+=nextChar
            prevString+= currString
        return prevString[k-1] 


# Logarithmic approach: O(log(k))

class Solution:
    def kthCharacter(self, k: int) -> str:
        ans = 0
        while k != 1:
            power = k.bit_length() - 1
            if (1 << power) == k:
                power -= 1
            k -= 1 << power
            ans += 1
        return chr(ord("a") + ans)



# Bit Count: TC (O(1))
class Solution:
    def kthCharacter(self, k: int) -> str:
        return chr(ord("a")+ (k-1).bit_count())