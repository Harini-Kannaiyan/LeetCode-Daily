import java.util.*;

class Solution {
    public int maximumLength(int[] nums) {
        int maxSubSequence = 0;
        int[][] patterns = {
            {0, 0}, {1, 1}, {0, 1}, {1, 0}
        };

        for (int[] pattern : patterns) {
            int count = 0;
            for (int num : nums) {
                if (num % 2 == pattern[count % 2]) {
                    count++;
                }
            }
            maxSubSequence = Math.max(maxSubSequence, count);
        }

        return maxSubSequence;
    }
}
