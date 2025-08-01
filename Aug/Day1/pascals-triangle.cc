//  Time: O(N^2)  ::  Space: O(N^2)
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> pascalList;
        vector<int> nums = {1};
        pascalList.push_back(nums);

        for (int i = 1; i < numRows; ++i) {
            vector<int> temp(nums.size() + 1, 1);
            for (int j = 1; j < temp.size() - 1; ++j) {
                temp[j] = nums[j] + nums[j - 1];
            }
            nums = temp;
            pascalList.push_back(nums);
        }
        return pascalList;
    }
};
