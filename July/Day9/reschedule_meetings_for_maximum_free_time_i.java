// Brute Force Approach => TC: O(N) | O(N)
class Solution {
    public int maxFreeTime(int eventTime, int k, int[] startTime, int[] endTime) {
        int n = startTime.length;
        int[] total = new int[n + 1];
        int maxFreeTime = 0;

        for (int i = 0; i < n; i++) {
            total[i + 1] = total[i] + (endTime[i] - startTime[i]);
        }

        for (int i = k - 1; i < n; i++) {
            int right = (i == n - 1) ? eventTime : startTime[i + 1];
            int left = (i == k - 1) ? 0 : endTime[i - k];
            maxFreeTime = Math.max(maxFreeTime, right - left - (total[i + 1] - total[i - k + 1]));
        }

        return maxFreeTime;
    }
}


// Optimized Approach => TC: O(N) | O(1)
class Solution {
    public int maxFreeTime(int eventTime, int k, int[] startTime, int[] endTime) {
        int n = startTime.length;
        int total = 0, maxFreeTime = 0;

        for (int i = 0; i < n; i++) {
            total += endTime[i] - startTime[i];
            int left = (i <= k - 1) ? 0 : endTime[i - k];
            int right = (i == n - 1) ? eventTime : startTime[i + 1];
            maxFreeTime = Math.max(maxFreeTime, right - left - total);

            if (i >= k - 1) {
                total -= endTime[i - k + 1] - startTime[i - k + 1];
            }
        }

        return maxFreeTime;
    }
}
