//  Time: O(N^2)  
//  This is naive solution and will exceed time limit.
longestSubarrayBrute(nums) {
    let n = nums.length;
    let longestOneSubarray = 0;
    for (let i = 0; i < n; i++) {
        let countZeros = 0;
        let j = i;
        for (; j < n; j++) {
            if (nums[j] === 0) countZeros++;
            if (countZeros > 1) {
                j--;
                break;
            }
        }
        longestOneSubarray = Math.max(longestOneSubarray, j - i);
    }
    return longestOneSubarray;
}


// Optimized Solution  ::  Time: O(N)
longestSubarray(nums) {
    let n = nums.length;
    let longestOneSubarray = 0, sum = 0, lo = 0;
    for (let hi = 0; hi < n; hi++) {
        sum += nums[hi];
        if (sum < hi - lo) {
            sum -= nums[lo];
            lo++;
        }
        longestOneSubarray = Math.max(longestOneSubarray, hi - lo);
    }
    return longestOneSubarray;
}
