class Solution:
    # Time: O(N) | Space: O(1)
    def isValid(self, word: str) -> bool:
        if len(word) < 3:
            return False
        foundVowel= foundConsonant = False
        digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        vowels = ['A', 'a', 'e', 'E', 'i', 'I', 'O', 'o', 'U', 'u']
        symbols =['@', '#', '$']
        
        for ch in word:
            if ch in symbols:
                return False
            if ch in vowels:
                foundVowel = True
            elif ch not in digits: 
                foundConsonant = True
        
        return  foundVowel and foundConsonant


class Solution:
    # Time: O(N) | Space: O(1)
    def isValid(self, word: str) -> bool:
        if len(word) < 3:
            return False
        foundVowel= foundConsonant = False
        for ch in word:
            if ch.isalpha():
                if ch.lower() in 'aeiou':
                    foundVowel = True
                else:
                    foundConsonant = True
            elif not ch.isdigit():
                return False
        return foundVowel and foundConsonant


        