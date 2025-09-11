#  Time: O(N * LogN)  ::  Space: O(N)
class Solution:
    #TC, SC - O(n log n), O(n)
    def isVowel(self, c: str) -> bool:
        return c in "aeiouAEIOU"

    def sortVowels(self, s: str) -> str:
        vowels = set("aeiouAEIOU")
        arr = list(s)

        # Collect all vowels
        key = [ch for ch in arr if self.isVowel(ch)]

        # Sort vowels
        key.sort()

        # Replace vowels in order
        j = 0
        for i in range(len(arr)):
            if self.isVowel(arr[i]):
                arr[i] = key[j]
                j += 1

        return ''.join(arr)



#  Time: O(N)  :: Space: O(1)
class Solution:
    def isVowel(self, c: str) -> bool:
        return c in "aeiouAEIOU"

    def sortVowels(self, s: str) -> str:
        from collections import Counter

        # Count frequencies of vowels
        count = Counter([c for c in s if self.isVowel(c)])

        # Sorted vowel order (ASCII)
        sortedVowel = "AEIOUaeiou"

        ans = []
        j = 0
        for ch in s:
            if not self.isVowel(ch):
                ans.append(ch)
            else:
                # Move to the next vowel that still has remaining count
                while j < len(sortedVowel) and count[sortedVowel[j]] == 0:
                    j += 1
                ans.append(sortedVowel[j])
                count[sortedVowel[j]] -= 1

        return "".join(ans)