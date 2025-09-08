//  Time: O(N * LogN)  ::  Space: O(1)
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> getNoZeroIntegers(int n) {
        int a = 1, b = n - a;
        while ((to_string(a).find('0') != string::npos || to_string(b).find('0') != string::npos) && a <= b) {
            a++;
            b--;
        }
        return {a, b};
    }
};
