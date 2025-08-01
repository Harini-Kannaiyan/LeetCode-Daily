class Solution:
    # Time: O(N * 2^N)  ::  Space: O(1) 
    def countMaxOrSubsets(self, nums: List[int]) -> int:
        n = len(nums)
        maxOrValue = subsetWithMaxOr = 0
        for num in nums:
            maxOrValue |= num
        mask = 2**n-1
        while mask :
            i, copy, ans = n-1, mask, []
            currentOrValue = 0
            while copy:
                if copy & 1:
                    currentOrValue |= nums[i]
                i, copy = i-1, copy >>1
            
            if currentOrValue == maxOrValue:
                subsetWithMaxOr +=1
            mask-=1
        return subsetWithMaxOr

class Solution:
    # Time: O(N * MAX_OR)  ::  Space: O(2^17)
    def countMaxOrSubsets(self, nums: List[int]) -> int:
        maxOrValue = 0
        dp = [0] * (1 << 17)

        dp[0] = 1

        for num in nums:
            for i in range(maxOrValue, -1, -1):
                dp[i | num] += dp[i]

            maxOrValue |= num

        return dp[maxOrValue]