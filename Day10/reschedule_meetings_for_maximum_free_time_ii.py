# Brute Force Approach => TC: O(N) | O(N)
class Solution:
    def maxFreeTime(self, eventTime: int, startTime: List[int], endTime: List[int]) -> int:
        n = len(startTime)
        maxFreeTime = 0
        totalFreeTimeAvailableFromLeft = 0
        freeTimeAvailable = [False]*n
        totalFreeTimeAvailableFromRight = 0
        for i in range(n):
            if endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft:
                freeTimeAvailable[i] = True
            totalFreeTimeAvailableFromLeft = max( totalFreeTimeAvailableFromLeft, startTime[i] - (0 if i == 0 else endTime[i-1]))

            if endTime[n-i-1] - startTime[n-i-1] <= totalFreeTimeAvailableFromRight:
                freeTimeAvailable[n-i-1] = True
            totalFreeTimeAvailableFromRight = max(totalFreeTimeAvailableFromRight, ((eventTime if i==0 else startTime[n-i]) - endTime[n-i-1]))
        
        for i in range(n):
            left = 0 if i == 0 else endTime[i - 1]
            right = eventTime if i == n - 1 else startTime[i + 1]
            if freeTimeAvailable[i]:
                maxFreeTime = max(maxFreeTime, right - left)
            else:
                maxFreeTime = max(maxFreeTime, right - left - (endTime[i] - startTime[i]))
        return maxFreeTime


# Optimized Approach => TC: O(N) | O(1)
class Solution:
    def maxFreeTime(self, eventTime: int, startTime: List[int], endTime: List[int]) -> int:
        n = len(startTime)
        maxFreeTime = 0
        totalFreeTimeAvailableFromLeft = 0
        freeTimeAvailable = False
        totalFreeTimeAvailableFromRight = 0
        for i in range(n):
            left1 = 0 if i == 0 else endTime[i-1]
            right1 = eventTime if i == n - 1 else startTime[i + 1]
            if endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft:
                maxFreeTime = max(maxFreeTime, right1 - left1)
            maxFreeTime = max(maxFreeTime, right1 - left1 - (endTime[i] - startTime[i]))
            totalFreeTimeAvailableFromLeft = max( totalFreeTimeAvailableFromLeft, startTime[i] - (0 if i == 0 else endTime[i-1]))

            left2 = 0 if i == n-1 else endTime[n-i-2]
            right2 = eventTime if i==0 else startTime[n-i]
            if endTime[n-i-1] - startTime[n-i-1] <= totalFreeTimeAvailableFromRight:
                maxFreeTime = max(maxFreeTime, right2 - left2)
            
            totalFreeTimeAvailableFromRight = max(totalFreeTimeAvailableFromRight, ((eventTime if i==0 else startTime[n-i]) - endTime[n-i-1]))
        
        return maxFreeTime






