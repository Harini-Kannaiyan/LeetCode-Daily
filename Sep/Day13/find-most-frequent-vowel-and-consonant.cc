// Both Approaches:  Time: O(N)  ::  Space: O(1)
class Solution {
public:
    int maxFreqSum1(string s) {
        unordered_map<char, int> freqMap;
        for (char ch : s) {
            freqMap[ch]++;
        }

        int vowelMaxFreq = 0, consonantMaxFreq = 0;
        string vowels = "aeiou";

        for (auto &p : freqMap) {
            if (vowels.find(p.first) != string::npos)
                vowelMaxFreq = max(vowelMaxFreq, p.second);
            else
                consonantMaxFreq = max(consonantMaxFreq, p.second);
        }
        return vowelMaxFreq + consonantMaxFreq;
    }


    int maxFreqSum2(string s) {
        unordered_map<char, int> freqMap;
        for (char ch : s) {
            freqMap[ch]++;
        }

        int vowelMaxFreq = 0, consonantMaxFreq = 0;
        string vowels = "aeiou";

        for (char ch : s) {
            if (vowels.find(ch) != string::npos)
                vowelMaxFreq = max(vowelMaxFreq, freqMap[ch]);
            else
                consonantMaxFreq = max(consonantMaxFreq, freqMap[ch]);
        }
        return vowelMaxFreq + consonantMaxFreq;
    }
};
