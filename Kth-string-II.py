class Solution:
    #Tc - 2^t , t is the power 1, 2, 3,
    def kthCharacter(self, k: int) -> str:
        prevString, i = 'a', 0
        while len(prevString) < k:
            size = len(prevString)
            currString =''
            if operations[i]:
                for ch in prevString:
                    nextChar = chr(ord('a') + ((ord(ch) - ord('a') + 1) % 26))
                    currString+=nextChar
            else:
                currString = prevString
            prevString+= currString
            i+=1
        return prevString[k-1] 

class Solution:
    def kthCharacter(self, k: int, operations: List[int]) -> str:
        #TC = log(k)
        ans = 0
        while k != 1:
            power = k.bit_length() - 1
            if (1 << power) == k:
                power -= 1
            k -= 1 << power
            if operations[power]:
                ans += 1
        return chr(ord("a") + ans)

class Solution:
    #Tc = O(logK)
    def kthCharacter(self, k: int, operations: List[int]) -> str:
        ans = 0
        k-=1
        for bitPos in range(k.bit_length() - 1, -1, -1):
            if (k >> bitPos) & 1:
                ans += operations[bitPos]
        return chr(ord("a") + (ans % 26))
        
