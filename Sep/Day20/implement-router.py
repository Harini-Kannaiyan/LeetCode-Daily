from collections import deque
from typing import List

class Router:

    def __init__(self, memoryLimit: int):
        self.dq = deque()               # queue of packets
        self.routerHashMap = set()      # fast lookup to avoid duplicates
        self.memoryLimit = memoryLimit

    def addPacket(self, source: int, destination: int, timestamp: int) -> bool:#O(1)
        packet = (source, destination, timestamp)  # use tuple
        if packet in self.routerHashMap:
            return False

        if len(self.dq) == self.memoryLimit:
            self.forwardPacket()

        self.dq.append(packet)
        self.routerHashMap.add(packet)
        return True

    def forwardPacket(self) -> List[int]:#O(1)
        if self.dq:
            packet = self.dq.popleft()
            self.routerHashMap.remove(packet)
            return list(packet)
        return []

    def getCount(self, destination: int, startTime: int, endTime: int) -> int: #O(n)
        count = 0
        for src, dst, ts in self.dq:
            if dst == destination and startTime <= ts <= endTime:
                count += 1
        return count


class Router:

    def __init__(self, memoryLimit: int):
        self.dq = deque()                     # queue of packets
        self.routerHashMap = set()            # fast duplicate check
        self.memoryLimit = memoryLimit
        self.destinationMap = {}              # dest -> SortedList of timestamps

    def addPacket(self, source: int, destination: int, timestamp: int) -> bool:#O(1)
        packet = (source, destination, timestamp)
        if packet in self.routerHashMap:
            return False

        if len(self.dq) == self.memoryLimit:
            self.forwardPacket()

        self.dq.append(packet)
        self.routerHashMap.add(packet)

        if destination not in self.destinationMap:
            self.destinationMap[destination] = SortedList()
        self.destinationMap[destination].add(timestamp)   # O(log n)

        return True

    def forwardPacket(self) -> List[int]:#O(logN)
        if self.dq:
            packet = self.dq.popleft()
            self.routerHashMap.remove(packet)

            src, dst, ts = packet
            self.destinationMap[dst].remove(ts)   # O(log n)
            if not self.destinationMap[dst]:
                del self.destinationMap[dst]

            return list(packet)
        return []

    def getCount(self, destination: int, startTime: int, endTime: int) -> int:#O(logN)
        if destination not in self.destinationMap:
            return 0

        timestamps = self.destinationMap[destination]
        left = timestamps.bisect_left(startTime)
        right = timestamps.bisect_right(endTime)
        return right - left