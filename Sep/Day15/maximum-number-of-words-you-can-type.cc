//  Time: O(N * B)  ::  Space:  O(1)
class Solution {
public:
    int canBeTypedWords(string text, string brokenLetters) {
        int count = 0;
        string word;
        stringstream ss(text);
        while (ss >> word) {
            count++;
            for (char x : brokenLetters) {
                if (word.find(x) != string::npos) {
                    count--;
                    break;
                }
            }
        }
        return count;
    }
};



//  Time: O(N + B)  ::  Space:  O(1)
class Solution {
public:
    int canBeTypedWords(string text, string brokenLetters) {
        unordered_set<char> broken(brokenLetters.begin(), brokenLetters.end());
        int count = 0;
        string word;
        stringstream ss(text);
        while (ss >> word) {
            bool isBroken = false;
            for (char ch : word) {
                if (broken.count(ch)) {
                    isBroken = true;
                    break;
                }
            }
            if (!isBroken) count++;
        }
        return count;
    }
};



//  Time: O(N)  ::  Space:  O(1)
class Solution {
public:
    int canBeTypedWords(string text, string brokenLetters) {
        vector<int> brokenArr(26, 0);
        for (char ch : brokenLetters) {
            brokenArr[ch - 'a'] = 1;
        }
        
        bool wordIsBroken = false;
        int count = 1;
        for (char ch : text) {
            if (ch == ' ') {
                count++;
                wordIsBroken = false;
            } else {
                if (!wordIsBroken && brokenArr[ch - 'a']) {
                    wordIsBroken = true;
                    count--;
                }
            }
        }
        return count;
    }
};
