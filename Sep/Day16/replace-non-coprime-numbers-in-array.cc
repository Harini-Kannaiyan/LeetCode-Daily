#include <vector>
#include <numeric> // for gcd
using namespace std;

class Solution {
public:
    vector<int> replaceNonCoprimes(vector<int>& nums) {
        vector<int> stack;
        for (int num : nums) {
            while (!stack.empty()) {
                int g = gcd(stack.back(), num);
                if (g == 1) break;
                num = (1LL * stack.back() * num) / g; // use long long to prevent overflow
                stack.pop_back();
            }
            stack.push_back(num);
        }
        return stack;
    }
};
