// Time: O(N * 2^N)  ::  Space: O(1) 
var countMaxOrSubsets = function(nums) {
    let n = nums.length;
    let maxOrValue = 0, subsetWithMaxOr = 0;
    for (let num of nums) maxOrValue |= num;

    let mask = (1 << n) - 1;
    while (mask > 0) {
        let currentOrValue = 0;
        let copy = mask;
        let i = n - 1;
        while (copy > 0) {
            if ((copy & 1) === 1) currentOrValue |= nums[i];
            copy >>= 1;
            i--;
        }
        if (currentOrValue === maxOrValue) subsetWithMaxOr++;
        mask--;
    }
    return subsetWithMaxOr;
};




// Time: O(N * MAX_OR)  ::  Space: O(2^17)
var countMaxOrSubsets = function(nums) {
    const dp = new Array(1 << 17).fill(0);
    dp[0] = 1;

    let maxOrValue = 0;
    for (let num of nums) {
        for (let i = maxOrValue; i >= 0; i--) {
            if (dp[i] > 0) {
                dp[i | num] += dp[i];
            }
        }
        maxOrValue |= num;
    }

    return dp[maxOrValue];
};
