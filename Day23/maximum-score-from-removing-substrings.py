class Solution:
    # Time: O(N)  ::  Space: O(N)
    def maximumGain(self, s: str, x: int, y: int) -> int:
        def removeSubString(word, target):
            stack = []
            totalcharRemovedCount = 0

            for ch in word:
                if ch == target[1] and stack and stack[-1] == target[0]:
                    stack.pop()
                    totalcharRemovedCount+=2
                else:
                    stack.append(ch)
            return ["".join(stack), totalcharRemovedCount]

        maximumScore = 0
        firstChoosenPair = "ab" if x > y else "ba"
        nextPair = 'ba' if x>y else 'ab'

        stringAfterRemovalOfFirstPair,removedPairsCount  = removeSubString(s, firstChoosenPair)
        removedPairsCount//=2

        maximumScore = removedPairsCount*max(x,y)

        stringAfterRemovalOfSecondPair,removedPairsCount = removeSubString(stringAfterRemovalOfFirstPair, nextPair)
        removedPairsCount//=2

        maximumScore += removedPairsCount*min(x,y)

        return maximumScore

class Solution:
    # Time: O(N)  ::  Space: O(1)
    def maximumGain(self, s: str, x: int, y: int) -> int:
        def removeSubString(word, target):
            writeIndex = 0
            totalPairRemovedCount = 0
            for readIndex in range(len(word)):
                word[writeIndex] = word[readIndex]
                writeIndex+=1
                if writeIndex> 1 and word[writeIndex-2] == target[0] and word[writeIndex-1] == target[1]:
                    totalPairRemovedCount+=1
                    writeIndex-=2
            del word[writeIndex: ]
            return  totalPairRemovedCount

        maximumScore = 0
        s = list(s)
        if x > y:
            maximumScore+= (x*(removeSubString(s, 'ab')))
            maximumScore+= (y*(removeSubString(s, 'ba')))
        else :
            maximumScore+= (y*(removeSubString(s, 'ba')))
            maximumScore+= (x*(removeSubString(s, 'ab')))


        return maximumScore

        