class Solution:
    def earliestAndLatest(self, n: int, firstPlayer: int, secondPlayer: int) -> List[int]:
        firstPlayer, secondPlayer = firstPlayer-1, secondPlayer-1 # 0-indexed
    
        def earliestAndLatestUtil(k, mask): 
            """Return earliest and latest rounds."""
            currentPlayers = deque()
            #print(mask)
            for i in range(n): 
                if mask & (1 << i): currentPlayers.append(i)
            #print("currentPlayers", currentPlayers)       
            eliminatedPlayers = [] # eliminated player
            while len(currentPlayers) > 1: 
                p1, p2 = currentPlayers.popleft(), currentPlayers.pop()
                if p1 == firstPlayer and p2 == secondPlayer or p1 == secondPlayer and p2 == firstPlayer: return [k, k] # game of interest 
                if p1 in (firstPlayer, secondPlayer): eliminatedPlayers.append([p2]) # p2 eliminated 
                elif p2 in (firstPlayer, secondPlayer): eliminatedPlayers.append([p1]) # p1 eliminated 
                else: eliminatedPlayers.append([p1, p2]) # both could be elimited 
            
            #print("eliminated player: ", eliminatedPlayers)
            minRound, maxRound = inf, -inf
            for x in product(*eliminatedPlayers): 
                #print("combination: ", x)
                currentMask = mask
                for i in x: currentMask ^= 1 << i
                currMin, currMax = earliestAndLatestUtil(k+1, currentMask)
                minRound = min(minRound, currMin)
                maxRound = max(maxRound, currMax)
            return minRound, maxRound
        
        return earliestAndLatestUtil(1, (1<<n)-1)
        