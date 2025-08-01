function maximumLength(nums, k) {
    const dp = Array.from({ length: k }, () => Array(k).fill(0));
    let maxSubsequence = 0;

    for (let num of nums) {
        num = num % k;
        for (let prev = 0; prev < k; prev++) {
            dp[prev][num] = dp[num][prev] + 1;
            maxSubsequence = Math.max(maxSubsequence, dp[prev][num]);
        }
    }

    return maxSubsequence;
}
