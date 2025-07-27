// Time: O(N)  ::  Space: O(1)
var countHillValley = function(nums) {
    let count = 0;
    let temp = 1;

    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
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
};
