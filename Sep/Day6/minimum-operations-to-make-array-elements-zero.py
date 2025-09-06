#  Time: O(N * Log(R))  :: Space: O(1)
class Solution:
    def minimumOperations(self, num: int) -> int:
        binaryLength = 1
        base = 1
        count = 0
        while base <= num:
            count += ((binaryLength + 1) // 2) * (min(base * 2 - 1, num) - base + 1)
            binaryLength += 1
            base *= 2
        return count

    def minOperations(self, queries: List[List[int]]) -> int:
        sumOfResults = 0
        for query in queries:
            sumOfResults += (self.minimumOperations(query[1]) - self.minimumOperations(query[0] - 1) + 1) // 2
        return sumOfResults