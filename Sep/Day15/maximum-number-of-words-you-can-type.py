class Solution:
    #TC - O(n*b), SC - O(1)
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        count = 0
        for tex in text.split():
            count+=1
            for x in brokenLetters:
                if x in tex:
                    count -=1
                    break
        return count

class Solution:
    #TC - O(n+b), SC - O(1) - beats 100% runtime
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        brokenLetters = set(brokenLetters) #O(b) to convert to a set
        count = 0
        for tex in text.split():
            if not any(ch in brokenLetters for ch in tex):
                count+=1
        return count

class Solution:
    #TC - O(n), SC - O(1) - beats 36.59%
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        bokenLettersArr = [0]*26
        for ch in brokenLetters:
            bokenLettersArr[ord(ch) - 97]=1
        
        wordIsBroken = False
        count = 1
        for ch in text:
            if ch == ' ':
                count+=1
                wordIsBroken = False
            else :
                if not wordIsBroken and bokenLettersArr[ord(ch) - 97] :
                    wordIsBroken = True
                    count -=1
        return count