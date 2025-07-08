import java.util.Arrays;

public class Solution {
    public int maxValue(int[][] events, int k) {
        Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));
        int n = events.length;
        int[][] dp = new int[n + 1][k + 1];

        int searchNextEvent(int currentEnd) {
            int left = 0, right = n;
            while (left < right) {
                int mid = (left + right) / 2;
                if (events[mid][0] <= currentEnd) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            return left;
        }

        for (int i = n - 1; i >= 0; i--) {
            int nextIndex = searchNextEvent(events[i][1]);
            for (int cnt = 1; cnt <= k; cnt++) {
                dp[i][cnt] = Math.max(dp[i + 1][cnt], events[i][2] + dp[nextIndex][cnt - 1]);
            }
        }

        return dp[0][k];
    }
}
