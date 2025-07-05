#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> freq;
        for (int num : arr) {
            freq[num]++;
        }

        int luckyNum = -1;
        for (auto& [key, val] : freq) {
            if (key == val) {
                luckyNum = max(luckyNum, key);
            }
        }
        return luckyNum;
    }
};
