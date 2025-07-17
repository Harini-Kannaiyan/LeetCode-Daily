#include <vector>
#include <algorithm>

class Solution {
public:
    int maximumLength(std::vector<int>& nums, int k) {
        std::vector<std::vector<int>> dp(k, std::vector<int>(k, 0));
        int maxSubsequence = 0;

        for (int num : nums) {
            num %= k;
            for (int prev = 0; prev < k; ++prev) {
                dp[prev][num] = dp[num][prev] + 1;
                maxSubsequence = std::max(maxSubsequence, dp[prev][num]);
            }
        }

        return maxSubsequence;
    }
};
