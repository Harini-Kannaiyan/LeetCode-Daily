class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        maxSubSequence = 0
        for pattern in [[0, 0], [1, 1] ,[0, 1], [1, 0]]:
            count = 0
            for num in nums:
                if num % 2 == pattern[count % 2]:
                    count += 1
            maxSubSequence = max(maxSubSequence, count)
        return maxSubSequence