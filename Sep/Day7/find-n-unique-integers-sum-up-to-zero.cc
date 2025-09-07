//  Time: O(N)  ::  Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> sumZero(int n) {
        vector<int> result;
        if (n % 2 == 1) {
            result.push_back(0);
        }
        int index = n / 2 + 1;
        for (int i = 1; i < index; i++) {
            result.push_back(i);
            result.push_back(-i);
        }
        return result;
    }
};
