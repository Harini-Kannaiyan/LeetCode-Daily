#include <vector>
#include <algorithm>

class Solution {
public:
    int maximumLength(std::vector<int>& nums) {
        int maxSubSequence = 0;
        std::vector<std::vector<int>> patterns = {
            {0, 0}, {1, 1}, {0, 1}, {1, 0}
        };

        for (const auto& pattern : patterns) {
            int count = 0;
            for (int num : nums) {
                if (num % 2 == pattern[count % 2]) {
                    count++;
                }
            }
            maxSubSequence = std::max(maxSubSequence, count);
        }

        return maxSubSequence;
    }
};
