#  Time: O(N * LogN)  ::  Space: O(1)
class Solution:
    def getNoZeroIntegers(self, n: int) -> List[int]:
        a = 1
        b = n-a
        while '0' in str(a) + str (b) and a <= b:
            a+=1
            b-=1
        return [a,b]

        