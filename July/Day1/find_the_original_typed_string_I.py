# Time Complelexity: O(N) | Space: O(1)

class Solution:
    def possibleStringCount(self, word: str) -> int:
        prev = ''
        count= possibleStringsCount = 1
        for i in range(len(word)):
            if prev == word[i]:
                count+=1
            else :
                prev = word[i]
                possibleStringsCount+=count
                count = 0

        return possibleStringsCount+count


class Solution:
    def possibleStringCount(self, word: str) -> int:
        prev = ''
        possibleStringsCount =  1
        for i in range(1, len(word)):
            if word[i-1] == word[i]:
                possibleStringsCount+=1

        return possibleStringsCount
