# HashMap Approach  ::  Time: O(N) ::  Space: O(N)
class Solution:
    def maxSum(self, nums: List[int]) -> int:
        freq =Counter()
        maximumSum = -inf
        isFullNegative = True
        for num in nums:
            if num >= 0:
                isFullNegative = False
                maximumSum = 0


        for num in nums:
            if isFullNegative:
                maximumSum = max(num, maximumSum)
            elif num not in freq and num > 0:
                freq[num] = 1
                maximumSum+=num
            
        
        return maximumSum



# Sorting Approach  ::  Time: O(Nlogn) + O(N) ::  Space: O(1)
class Solution:
    def maxSum(self, nums: List[int]) -> int:
        nums.sort()
        prev = maximumSum =-inf


        for num in nums:
            if num <= 0:
                maximumSum = max(num, maximumSum)
            elif prev != num:
                if maximumSum < 0:
                    maximumSum = 0
                prev = num
                maximumSum+= num
        
        return maximumSum