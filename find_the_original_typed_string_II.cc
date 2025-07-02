#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int possibleStringCount(string word, int k) {
        const int MOD = 1e9 + 7;
        if (word.empty()) return 0;

        vector<int> groups;
        int consecutiveCharactersCount = 1;

        for (int i = 1; i < word.size(); ++i) {
            if (word[i] == word[i - 1]) {
                consecutiveCharactersCount++;
            } else {
                groups.push_back(consecutiveCharactersCount);
                consecutiveCharactersCount = 1;
            }
        }
        groups.push_back(consecutiveCharactersCount);

        long long totalPossibleCombinations = 1;
        for (int frequency : groups) {
            totalPossibleCombinations = (totalPossibleCombinations * frequency) % MOD;
        }

        if (k <= groups.size()) return totalPossibleCombinations;

        vector<int> prev(k, 0);
        prev[0] = 1;

        for (int count : groups) {
            vector<int> curr(k, 0);
            long long currSum = 0;
            for (int i = 0; i < k; ++i) {
                if (i > 0) currSum = (currSum + prev[i - 1]) % MOD;
                if (i > count) currSum = (currSum - prev[i - count - 1] + MOD) % MOD;
                curr[i] = currSum;
            }
            prev = curr;
        }

        long long invalidCombinations = 0;
        for (int i = groups.size(); i < k; ++i) {
            invalidCombinations = (invalidCombinations + prev[i]) % MOD;
        }

        return (totalPossibleCombinations - invalidCombinations + MOD) % MOD;
    }
};
