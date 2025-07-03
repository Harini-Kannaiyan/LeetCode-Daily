# Time Complexity: O(N+K^2)  |  Space Complexity: O(K)

class Solution:

    def possibleStringCount(self, word: str, k: int) -> int:
        MOD = 10**9+7
        if not word:
            return 0

        groups = []
        consecutiveCharactersCount = 1
        for i in range(1, len(word)):
            if word[i] == word[i - 1]:
                consecutiveCharactersCount += 1
            else:
                groups.append(consecutiveCharactersCount)
                consecutiveCharactersCount = 1
        groups.append(consecutiveCharactersCount)

        totalPossibleCombinations = 1
        for frequency in groups:
            totalPossibleCombinations = (totalPossibleCombinations * frequency) % MOD

        if k <= len(groups):
            return totalPossibleCombinations

        prev = [0] * k
        prev[0] = 1

        for count in groups:
            curr = [0] * k
            currSum = 0
            for i in range(k):
                if i > 0:
                    currSum = (currSum+ prev[i-1]) % MOD
                if i > count:
                    currSum = (currSum - prev[i - count - 1] + MOD) % MOD
                curr[i] = currSum
            prev = curr

        invalidCombinations = sum(curr[len(groups):k]) % MOD
        return (totalPossibleCombinations - invalidCombinations + MOD) % MOD
