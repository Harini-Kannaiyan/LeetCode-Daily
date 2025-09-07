#  Time: O(N)  ::  Space: O(N)
class Solution:
    def sumZero(self, n: int) -> List[int]:
        resultantArray = [0] if n%2 == 1 else []
        index = n//2+1
        for i in range(1, index):
            resultantArray.extend([i, -i])
        return resultantArray
        