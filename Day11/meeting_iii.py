class Solution:
    #TC - Mlogm(sort)+ M*N
    #SC - o(3N) => o(N)
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        meetingsAttendedCount =[0]*n 
        roomsAvailableAtTime = [0]*n
        for start, end in meetings:
            minRoomAvailabilityTime = inf
            nextAvailableRoom = 0
            foundFreeRoom = False
            for i in range(n):
                if rooms[i] <= start:
                    foundFreeRoom = True
                    meetingCount[i]+=1
                    roomsAvailableAtTime[i] = end
                    break
                if minRoomAvailabilityTime > roomsAvailableAtTime[i]:
                    minRoomAvailabilityTime = roomsAvailableAtTime[i]
                    nextAvailableRoom = i

            if not foundFreeRoom:
                roomsAvailableAtTime[nextAvailableRoom]+= (end-start)
                meetingCount[nextAvailableRoom]+=1
        return meetingsAttendedCount.index(max(meetingsAttendedCount))

class Solution:
    #TC - Mlogm(sort)+ MlogN(pushing and poping in PQ for M events)
    #SC - o(3N) => o(N)
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        meetingsAttendedCount =[0]*n 
        roomsAvailable = [i for i in range(n)] #priority Queue for meetings
        roomsOccupied = []
        for start, end in meetings:
            while roomsOccupied and roomsOccupied[0][0] <= start:
                _, room = heappop(roomsOccupied)
                heappush(roomsAvailable, room)
            if roomsAvailable:
                room = heapq.heappop(roomsAvailable)
                heapq.heappush(roomsOccupied, [end, room])
            else:
                endTime, room = heapq.heappop(roomsOccupied)
                endTime+= (end-start)
                heapq.heappush(roomsOccupied, [endTime, room])
            meetingsAttendedCount[room]+=1
        return meetingsAttendedCount.index(max(meetingsAttendedCount))
            

        