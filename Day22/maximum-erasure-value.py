class Solution:
    # Time: O(N^2)  ::  Space: O(N)
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        uniqueElements = []
        maxScore = -1
        currSum = 0

        for num in nums:
            if num in uniqueElements:
                currSum = 0
                index = uniqueElements.index(num)
                uniqueElements = uniqueElements[index+1:]
            uniqueElements.append(num)
            currSum+=num
            maxScore = max(maxScore, currSum)
        return  maxScore

class Solution:
    # Time: O(N)  ::  Space: O(N)
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        uniqueElements = set()
        left = 0
        currSum = 0
        maxScore = 0
        
        for right in range(len(nums)):
            while nums[right] in uniqueElements:
                currSum -= nums[left]
                uniqueElements.remove(nums[left])
                left += 1
            currSum += nums[right]
            uniqueElements.add(nums[right])
            maxScore = max(maxScore, currSum)
        
        return maxScore