public class Solution {
    public int maximumLength(int[] nums, int k) {
        int[][] dp = new int[k][k];
        int maxSubsequence = 0;

        for (int num : nums) {
            num = num % k;
            for (int prev = 0; prev < k; prev++) {
                dp[prev][num] = dp[num][prev] + 1;
                maxSubsequence = Math.max(maxSubsequence, dp[prev][num]);
            }
        }

        return maxSubsequence;
    }
}
