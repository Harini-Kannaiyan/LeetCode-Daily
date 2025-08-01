class Solution {
// Time: O(N) | Space: O(1)
public:
    bool isValid(string word) {
        if (word.length() < 3) return false;

        bool foundVowel = false, foundConsonant = false;
        for (char ch : word) {
            if (isalpha(ch)) {
                char lower = tolower(ch);
                if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u')
                    foundVowel = true;
                else
                    foundConsonant = true;
            } else if (!isdigit(ch)) {
                return false;
            }
        }
        return foundVowel && foundConsonant;
    }
};


class Solution {
// Time: O(N) | Space: O(1)
public:
    bool isValid(string word) {
        if (word.length() < 3) return false;

        vector<char> digits = {'0','1','2','3','4','5','6','7','8','9'};
        vector<char> vowels = {'A','a','E','e','I','i','O','o','U','u'};
        vector<char> symbols = {'@', '#', '$'};

        bool foundVowel = false, foundConsonant = false;

        for (char ch : word) {
            if (find(symbols.begin(), symbols.end(), ch) != symbols.end()) {
                return false;
            }
            if (find(vowels.begin(), vowels.end(), ch) != vowels.end()) {
                foundVowel = true;
            } else if (find(digits.begin(), digits.end(), ch) == digits.end()) {
                foundConsonant = true;
            }
        }

        return foundVowel && foundConsonant;
    }
};