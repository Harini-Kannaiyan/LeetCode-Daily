class Solution:
# Brute Force Approach => TC: O(N) | O(N)
    def maxFreeTime(self, eventTime: int, k: int, startTime: List[int], endTime: List[int]) -> int:
        n = len(startTime)
        maxFreeTime = 0
        total = [0] * (n + 1)
        for i in range(n):
            total[i + 1] = total[i] + endTime[i] - startTime[i]
        for i in range(k - 1, n):
            right = eventTime if i == n - 1 else startTime[i + 1]
            left = 0 if i == k - 1 else endTime[i - k]
            maxFreeTime = max(maxFreeTime, right - left - (total[i + 1] - total[i - k + 1]))
        return maxFreeTime


class Solution:
# Optimized Approach => TC: O(N) | O(1)
    def maxFreeTime(self, eventTime: int, k: int, startTime: List[int], endTime: List[int]) -> int:
        n = len(startTime)
        maxFreeTime = 0
        total = 0
        for i in range(n):
            total += endTime[i] - startTime[i]
            left = 0 if i <= k - 1 else endTime[i - k]
            right = eventTime if i == n - 1 else startTime[i + 1]
            maxFreeTime = max(maxFreeTime, right - left - total)
            if i >= k - 1:
                total -= endTime[i - k + 1] - startTime[i - k + 1]
        return maxFreeTime