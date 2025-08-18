#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    bool judgePoint24(vector<int>& cards) {
        vector<double> nums(cards.begin(), cards.end());
        return solve(nums);
    }

private:
    bool solve(vector<double> nums) {
        if (nums.size() == 1) {
            return fabs(nums[0] - 24) < 1e-6;
        }
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums.size(); j++) {
                if (i != j) {
                    vector<double> remaining;
                    for (int k = 0; k < nums.size(); k++) {
                        if (k != i && k != j) remaining.push_back(nums[k]);
                    }
                    vector<double> candidates = {
                        nums[i] + nums[j],
                        nums[i] - nums[j],
                        nums[j] - nums[i],
                        nums[i] * nums[j]
                    };
                    for (double val : candidates) {
                        vector<double> next = remaining;
                        next.push_back(val);
                        if (solve(next)) return true;
                    }
                    if (fabs(nums[j]) > 1e-6) {
                        vector<double> next = remaining;
                        next.push_back(nums[i] / nums[j]);
                        if (solve(next)) return true;
                    }
                    if (fabs(nums[i]) > 1e-6) {
                        vector<double> next = remaining;
                        next.push_back(nums[j] / nums[i]);
                        if (solve(next)) return true;
                    }
                }
            }
        }
        return false;
    }
};
