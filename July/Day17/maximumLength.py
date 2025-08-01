class Solution:
    def maximumLength(self, nums: List[int], k: int) -> int:
        dp = [[0] * k for _ in range(k)]
        maxSubsequence = 0
        for num in nums:
            num %= k
            for prev in range(k):
                dp[prev][num] = dp[num][prev] + 1
                maxSubsequence = max(maxSubsequence, dp[prev][num])
        return maxSubsequence
