# Time: O(N)  ::  Space: O(1)

class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        maxSubArrayVal = longestSubArrayLen = res = 0
        for num in nums:
            if maxSubArrayVal < num:
                maxSubArrayVal = num
                res = longestSubArrayLen = 0

            if maxSubArrayVal == num:
                longestSubArrayLen += 1
            else:
                longestSubArrayLen = 0

            res = max(res, longestSubArrayLen)
        return res
        