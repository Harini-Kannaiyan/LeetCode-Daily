// Time: O(N)  ::  Space: O(1)
class Solution {
    public int countHillValley(int[] nums) {
        int count = 0;
        int temp = 1;
        int n = nums.length;

        for (int i = 1; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                temp++;
            } else if ((nums[i - temp] > nums[i] && nums[i] < nums[i + 1]) ||
                       (nums[i - temp] < nums[i] && nums[i] > nums[i + 1])) {
                temp = 1;
                count++;
            } else {
                temp = 1;
            }
        }
        return count;
    }
}
