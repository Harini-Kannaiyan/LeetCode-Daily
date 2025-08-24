#  Time: O(N^2)  
#  This is naive solution and will exceed time limit.
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        longestOneSubarray = 0
        for i in range(len(nums)):
            countZeros = countOnes = 0
            for j in range(i, len(nums)):
                if nums[j] == 0:
                    countZeros+=1
                if countZeros >1:
                    j-=1
                    break
            longestOneSubarray  = max(longestOneSubarray, j-i)
        return longestOneSubarray


# Optimized Solution  ::  Time: O(N)
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        longestOneSubarray = sum = lo = 0
        for hi, num in enumerate(nums):
            sum += num
            if sum < hi - lo:
                sum -= nums[lo]
                lo += 1
            longestOneSubarray = max(longestOneSubarray, hi - lo)
        return longestOneSubarray

            