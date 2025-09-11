//  Time: O(N * LogN)  ::  Space: O(N)
class Solution {
public:
    bool isVowel(char c) {
        string vowels = "aeiouAEIOU";
        return vowels.find(c) != string::npos;
    }
    string sortVowels(string s) {
        vector<char> key;
        for (char c : s) {
            if (isVowel(c)) key.push_back(c);
        }

        sort(key.begin(), key.end());

        int j = 0;
        for (int i = 0; i < s.size(); i++) {
            if (isVowel(s[i])) {
                s[i] = key[j++];
            }
        }
        return s;
    }
};



//  Time: O(N)  :: Space: O(1)
class Solution2 {
public:
    bool isVowel(char c) {
        string vowels = "aeiouAEIOU";
        return vowels.find(c) != string::npos;
    }
    string sortVowels(string s) {
        unordered_map<char, int> count;
        for (char c : s) {
            if (isVowel(c)) count[c]++;
        }

        string sortedVowel = "AEIOUaeiou";
        string ans = "";
        int j = 0;

        for (char c : s) {
            if (!isVowel(c)) {
                ans.push_back(c);
            } else {
                while (j < sortedVowel.size() && count[sortedVowel[j]] == 0) {
                    j++;
                }
                ans.push_back(sortedVowel[j]);
                count[sortedVowel[j]]--;
            }
        }
        return ans;
    }
};
