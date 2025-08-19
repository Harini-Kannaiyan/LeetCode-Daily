#  Time: O(N)  ::  Space: O(1)
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        totalZeroFilledSubarrays = currentZeroFilledSubarrays = 0

        for num in nums:
            if num == 0:
                currentZeroFilledSubarrays+=1
                totalZeroFilledSubarrays+=currentZeroFilledSubarrays
            else:
                currentZeroFilledSubarrays = 0
        return totalZeroFilledSubarrays
        



        
#  Time: O(N)  ::  Space: O(1)
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        totalZeroFilledSubarrays = currentZeroFilledSubarrays = 0

        for num in nums:
            if num != 0:
                cnt = (currentZeroFilledSubarrays*(currentZeroFilledSubarrays+1))//2
                totalZeroFilledSubarrays+=cnt
                currentZeroFilledSubarrays = 0
            else:
                currentZeroFilledSubarrays+=1
        if currentZeroFilledSubarrays != 0:
            cnt = (currentZeroFilledSubarrays*(currentZeroFilledSubarrays+1))//2
            totalZeroFilledSubarrays+=cnt

        return totalZeroFilledSubarrays
        