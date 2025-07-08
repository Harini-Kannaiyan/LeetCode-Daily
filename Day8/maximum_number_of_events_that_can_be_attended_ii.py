class Solution:
    #top down approach
    def maxValue(self, events: List[List[int]], k: int) -> int:
        def searchNextEvent(currentEvent):
            left = 0
            right = len(events)
            while left < right :
                mid = (right+left)//2
                if events[mid][0] <= currentEvent:
                    left = mid+1
                else:
                    right = mid
            return left

        
        def dfs(cur_index, count):
            if count == 0 or cur_index == n:
                return 0
            if dp[count][cur_index] != -1:
                return dp[count][cur_index]

            # Find the nearest available event after attending event 0.

            next_index = searchNextEvent(events[cur_index][1])
            dp[count][cur_index] = max(dfs(cur_index + 1, count), events[cur_index][2] + dfs(next_index, count - 1))
            return dp[count][cur_index]
       
        events.sort()
        n = len(events)
        starts = [start for start, end, value in events]
        dp = [[0] * (k+1) for _ in range(n+1)]

        dfs(0, 0)        
        return dp[0][k]

class Solution:
    #bottom up approach
    def maxValue(self, events: List[List[int]], k: int) -> int:
        def searchNextEvent(currentEvent):
            left = 0
            right = len(events)
            while left < right :
                mid = (right+left)//2
                if events[mid][0] <= currentEvent:
                    left = mid+1
                else:
                    right = mid
            return left
       
        events.sort()
        n = len(events)
        starts = [start for start, end, value in events]
        dp = [[0] * (k+1) for _ in range(n+1)]
      
        for cur_index in range(n - 1, -1, -1):
            next_index = searchNextEvent(events[cur_index][1])
            for count in range(1, k+1):
                dp[cur_index][count] = max(dp[cur_index + 1][count], events[cur_index][2] + dp[next_index][count-1])
        
        return dp[0][k]





