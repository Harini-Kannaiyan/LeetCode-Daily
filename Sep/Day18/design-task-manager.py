import heapq
from collections import defaultdict
from typing import List

class TaskManager:
    '''
    TC : add: O(log N),edit: O(log N) ,rmv: O(1) (no more scanning over all users!)
    execTop: amortized O(log N)
    SC - o(N)
    '''
    def __init__(self, tasks: List[List[int]]):
        self.taskMap = {}                # taskId -> priority
        self.globalHeap = []             # heap of (-priority, taskId)

        for userId, taskId, priority in tasks:
            self.add(userId, taskId, priority)

    def add(self, userId: int, taskId: int, priority: int) -> None:
        self.taskMap[taskId] = (priority, userId)
        heapq.heappush(self.globalHeap, (-priority, -taskId))

    def edit(self, taskId: int, newPriority: int) -> None:
        if taskId in self.taskMap:
            _, userId  = self.taskMap[taskId]
            self.taskMap[taskId] = (newPriority, userId)
            heapq.heappush(self.globalHeap, (-newPriority, -taskId))

    def rmv(self, taskId: int) -> None:
        _, userId = self.taskMap[taskId]
        del self.taskMap[taskId]

    def execTop(self) -> int:
        while self.globalHeap:
            priority, taskId = heapq.heappop(self.globalHeap)
            priority = -priority
            taskId = -taskId
            if taskId in self.taskMap and self.taskMap[taskId][0] == priority:
                _, userId = self.taskMap[taskId]
                self.rmv(taskId)
                return userId
        return -1  # no tasks left

# Your TaskManager object will be instantiated and called as such:
# obj = TaskManager(tasks)
# obj.add(userId,taskId,priority)
# obj.edit(taskId,newPriority)
# obj.rmv(taskId)
# param_4 = obj.execTop()