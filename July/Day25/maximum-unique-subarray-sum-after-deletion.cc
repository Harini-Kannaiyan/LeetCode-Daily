// HashMap Approach  ::  Time: O(N) ::  Space: O(N)
class Solution {
public:
    int maxSum(vector<int>& nums) {
        unordered_set<int> seen;
        int maxSum = INT_MIN;
        bool isFullNegative = true;

        for (int num : nums) {
            if (num >= 0) {
                isFullNegative = false;
                maxSum = 0;
            }
        }

        for (int num : nums) {
            if (isFullNegative) {
                maxSum = max(maxSum, num);
            } else if (seen.find(num) == seen.end() && num > 0) {
                seen.insert(num);
                maxSum += num;
            }
        }

        return maxSum;
    }
};



// Sorting Approach  ::  Time: O(Nlogn) + O(N) ::  Space: O(1)
class Solution {
public:
    int maxSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int maxSum = INT_MIN;
        int prev = -1;

        for (int num : nums) {
            if (num <= 0) {
                maxSum = max(maxSum, num);
            } else if (num != prev) {
                if (maxSum < 0) maxSum = 0;
                maxSum += num;
                prev = num;
            }
        }

        return maxSum;
    }
};

