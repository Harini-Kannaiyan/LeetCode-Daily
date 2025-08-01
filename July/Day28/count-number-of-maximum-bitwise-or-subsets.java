// Time: O(N * 2^N)  ::  Space: O(1) 
class Solution {
    public int countMaxOrSubsets(int[] nums) {
        int n = nums.length;
        int maxOrValue = 0, subsetWithMaxOr = 0;
        for (int num : nums) maxOrValue |= num;

        int mask = (1 << n) - 1;
        while (mask > 0) {
            int currentOrValue = 0;
            int copy = mask;
            int i = n - 1;
            while (copy > 0) {
                if ((copy & 1) == 1) currentOrValue |= nums[i];
                copy >>= 1;
                i--;
            }
            if (currentOrValue == maxOrValue) subsetWithMaxOr++;
            mask--;
        }
        return subsetWithMaxOr;
    }
}



// Time: O(N * MAX_OR)  ::  Space: O(2^17)
class Solution {
    public int countMaxOrSubsets(int[] nums) {
        int[] dp = new int[1 << 17];
        dp[0] = 1;

        int maxOrValue = 0;
        for (int num : nums) {
            for (int i = maxOrValue; i >= 0; i--) {
                if (dp[i] > 0) {
                    dp[i | num] += dp[i];
                }
            }
            maxOrValue |= num;
        }

        return dp[maxOrValue];
    }
}
