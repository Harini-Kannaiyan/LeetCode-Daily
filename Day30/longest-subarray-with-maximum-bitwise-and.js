// Time: O(N)  ::  Space: O(1)
var longestSubarray = function(nums) {
    let maxSubArrayVal = 0, longestSubArrayLen = 0, res = 0;

    for (let num of nums) {
        if (maxSubArrayVal < num) {
            maxSubArrayVal = num;
            res = longestSubArrayLen = 0;
        }

        if (maxSubArrayVal === num) {
            longestSubArrayLen++;
        } else {
            longestSubArrayLen = 0;
        }

        res = Math.max(res, longestSubArrayLen);
    }

    return res;
};
