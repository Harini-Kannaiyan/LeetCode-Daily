#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string removeVowel(const string& word) {
        string res = word;
        for (char &c : res) {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                c = '*';
        }
        return res;
    }

    vector<string> spellchecker(vector<string>& wordlist, vector<string>& queries) {
        unordered_set<string> exactWords(wordlist.begin(), wordlist.end());
        unordered_map<string, string> lowerCaseConvertedWords;
        unordered_map<string, string> vowelRemovedWords;

        for (auto& word : wordlist) {
            string lowerCaseWord = word;
            transform(lowerCaseWord.begin(), lowerCaseWord.end(), lowerCaseWord.begin(), ::tolower);

            if (lowerCaseConvertedWords.find(lowerCaseWord) == lowerCaseConvertedWords.end())
                lowerCaseConvertedWords[lowerCaseWord] = word;

            string vowelRemoved = removeVowel(lowerCaseWord);
            if (vowelRemovedWords.find(vowelRemoved) == vowelRemovedWords.end())
                vowelRemovedWords[vowelRemoved] = word;
        }

        vector<string> result;
        for (auto& query : queries) {
            if (exactWords.count(query)) {
                result.push_back(query);
                continue;
            }

            string lowerCaseQuery = query;
            transform(lowerCaseQuery.begin(), lowerCaseQuery.end(), lowerCaseQuery.begin(), ::tolower);

            if (lowerCaseConvertedWords.count(lowerCaseQuery)) {
                result.push_back(lowerCaseConvertedWords[lowerCaseQuery]);
                continue;
            }

            string vowelRemovedQuery = removeVowel(lowerCaseQuery);
            if (vowelRemovedWords.count(vowelRemovedQuery)) {
                result.push_back(vowelRemovedWords[vowelRemovedQuery]);
                continue;
            }

            result.push_back("");
        }
        return result;
    }
};
