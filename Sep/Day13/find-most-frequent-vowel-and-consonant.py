#  Time: O(N)  ::  Space: O(1)
class Solution:
    def maxFreqSum(self, s: str) -> int:
        freqMap = Counter(s)
        vowelMaxFreq = max((freqMap[ch] for ch in freqMap if ch in 'aeiou'), default = 0)
        consonantMaxFreq = max((freqMap[ch] for ch in freqMap if ch not in 'aeiou'), default = 0)

        return vowelMaxFreq + consonantMaxFreq


#  Time: O(N)  ::  Space: O(1)
class Solution:
    def maxFreqSum(self, s: str) -> int:       
        freqMap = Counter(s)
        vowelMaxFreq = consonantMaxFreq = 0
        for ch in s:
            if ch in 'aeiou':
                vowelMaxFreq = max(vowelMaxFreq, freqMap[ch])
            else:
                consonantMaxFreq = max(consonantMaxFreq, freqMap[ch])
        return vowelMaxFreq + consonantMaxFreq