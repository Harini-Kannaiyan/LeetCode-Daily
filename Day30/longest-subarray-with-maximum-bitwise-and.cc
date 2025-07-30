// Time: O(N)  ::  Space: O(1)
class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int maxSubArrayVal = 0, longestSubArrayLen = 0, res = 0;
        for (int num : nums) {
            if (maxSubArrayVal < num) {
                maxSubArrayVal = num;
                res = longestSubArrayLen = 0;
            }

            if (maxSubArrayVal == num) {
                longestSubArrayLen++;
            } else {
                longestSubArrayLen = 0;
            }

            res = max(res, longestSubArrayLen);
        }
        return res;
    }
};
