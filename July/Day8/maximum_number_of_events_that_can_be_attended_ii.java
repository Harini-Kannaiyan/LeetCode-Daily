import java.util.*;

// Top-Down approach
public class Solution {
    public int maxValue(int[][] events, int k) {
        Arrays.sort(events, Comparator.comparingInt(a -> a[0]));
        int n = events.length;
        Integer[][] dp = new Integer[n][k + 1];

        int searchNextEvent(int currentEnd) {
            int left = 0, right = n;
            while (left < right) {
                int mid = (left + right) / 2;
                if (events[mid][0] <= currentEnd) left = mid + 1;
                else right = mid;
            }
            return left;
        }

        int dfs(int index, int count) {
            if (count == 0 || index == n) return 0;
            if (dp[index][count] != null) return dp[index][count];

            int next = searchNextEvent(events[index][1]);
            dp[index][count] = Math.max(
                dfs(index + 1, count),
                events[index][2] + dfs(next, count - 1)
            );
            return dp[index][count];
        }

        return dfs(0, k);
    }
}


// Bottom-Up approach
import java.util.*;

public class Solution {
    public int maxValue(int[][] events, int k) {
        Arrays.sort(events, Comparator.comparingInt(a -> a[0]));
        int n = events.length;
        int[][] dp = new int[n + 1][k + 1];

        int searchNextEvent(int currentEnd) {
            int left = 0, right = n;
            while (left < right) {
                int mid = (left + right) / 2;
                if (events[mid][0] <= currentEnd) left = mid + 1;
                else right = mid;
            }
            return left;
        }

        for (int i = n - 1; i >= 0; i--) {
            int next = searchNextEvent(events[i][1]);
            for (int count = 1; count <= k; count++) {
                dp[i][count] = Math.max(
                    dp[i + 1][count],
                    events[i][2] + dp[next][count - 1]
                );
            }
        }

        return dp[0][k];
    }
}

