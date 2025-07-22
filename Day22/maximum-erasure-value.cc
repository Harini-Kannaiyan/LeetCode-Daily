class Solution {
// Time: O(N^2)  ::  Space: O(N)
public:
    int maximumUniqueSubarray(vector<int>& nums) {
        vector<int> uniqueElements;
        int maxScore = -1, currSum = 0;

        for (int num : nums) {
            auto it = find(uniqueElements.begin(), uniqueElements.end(), num);
            if (it != uniqueElements.end()) {
                currSum = 0;
                uniqueElements.erase(uniqueElements.begin(), it + 1);
            }
            uniqueElements.push_back(num);
            currSum += num;
            maxScore = max(maxScore, currSum);
        }
        return maxScore;
    }
};



class Solution {
// Time: O(N)  ::  Space: O(N)
public:
    int maximumUniqueSubarray(vector<int>& nums) {
        unordered_set<int> uniqueElements;
        int left = 0, currSum = 0, maxScore = 0;

        for (int right = 0; right < nums.size(); ++right) {
            while (uniqueElements.count(nums[right])) {
                currSum -= nums[left];
                uniqueElements.erase(nums[left]);
                left++;
            }
            currSum += nums[right];
            uniqueElements.insert(nums[right]);
            maxScore = max(maxScore, currSum);
        }
        return maxScore;
    }
};
