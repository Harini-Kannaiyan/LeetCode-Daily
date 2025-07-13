class Solution:
    # Time: O(n * m) + (n * O(n) => remove operation), Space: O(1) => TLE case
    def matchPlayersAndTrainers(self, players, trainers):
        count = 0
        for i in range(len(players)):
            minCap = float('inf')
            selected = -1
            for j in range(len(trainers)):
                if players[i] <= trainers[j] and trainers[j] < minCap:
                    minCap = trainers[j]
                    selected = j
            if selected != -1:
                count += 1
                trainers.pop(selected)
        return count


class Solution:
    # Time: O(n log n + m log m), Space: O(1)
    def matchPlayersAndTrainers(self, players, trainers):
        players.sort()
        trainers.sort()
        i = j = 0
        count = 0
        while i < len(players) and j < len(trainers):
            if players[i] <= trainers[j]:
                count += 1
                i += 1
            j += 1
        return count



        