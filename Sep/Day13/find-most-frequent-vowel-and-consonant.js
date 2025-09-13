// Both Approaches:  Time: O(N)  ::  Space: O(1)
class Solution {
    maxFreqSum1(s) {
        const freqMap = {};
        for (let ch of s) {
            freqMap[ch] = (freqMap[ch] || 0) + 1;
        }

        let vowelMaxFreq = 0, consonantMaxFreq = 0;
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

        for (let ch in freqMap) {
            if (vowels.has(ch)) {
                vowelMaxFreq = Math.max(vowelMaxFreq, freqMap[ch]);
            } else {
                consonantMaxFreq = Math.max(consonantMaxFreq, freqMap[ch]);
            }
        }
        return vowelMaxFreq + consonantMaxFreq;
    }

    maxFreqSum2(s) {
        const freqMap = {};
        for (let ch of s) {
            freqMap[ch] = (freqMap[ch] || 0) + 1;
        }

        let vowelMaxFreq = 0, consonantMaxFreq = 0;
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

        for (let ch of s) {
            if (vowels.has(ch)) {
                vowelMaxFreq = Math.max(vowelMaxFreq, freqMap[ch]);
            } else {
                consonantMaxFreq = Math.max(consonantMaxFreq, freqMap[ch]);
            }
        }
        return vowelMaxFreq + consonantMaxFreq;
    }
}
