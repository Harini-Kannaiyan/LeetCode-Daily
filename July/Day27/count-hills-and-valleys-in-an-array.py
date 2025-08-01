# Time: O(N)  ::  Space: O(1)
class Solution:
    def countHillValley(self, nums: List[int]) -> int:
        count =0
        temp = 1
        i = 1

        for i in range(1, len(nums)-1):
            if nums[i] == nums[i+1]:
                temp+=1
            elif nums[i-temp] > nums[i] <nums[i+1] or nums[i-temp] < nums[i] >nums[i+1]:
                temp = 1
                count+=1
            else:
                temp = 1
        return count
        