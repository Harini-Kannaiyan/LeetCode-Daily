// Time: O(N)  ::  Space: O(1)

#include <string>
using namespace std;

class Solution {
public:
    bool doesAliceWin(string s) {
        string vowels = "aeiou";
        for (char c : s) {
            if (vowels.find(c) != string::npos) {
                return true;
            }
        }
        return false;
    }
};
