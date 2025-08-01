#  Time: O(N^2)  ::  Space: O(N^2)
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        
        nums = [1]
        pascalList = [nums]
        for i in range(numRows-1):
            temp =[1]* (len(nums)+1)
            for j in range(1, len(temp)-1) :
                    temp[j]= nums[j]+nums[j-1]
            nums = temp
            pascalList.append(nums)
        return pascalList