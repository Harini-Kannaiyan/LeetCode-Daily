// Top-Down approach
class Solution {
public:
    int maxValue(vector<vector<int>>& events, int k) {
        sort(events.begin(), events.end());
        int n = events.size();
        vector<vector<int>> dp(n, vector<int>(k + 1, -1));

        auto searchNextEvent = [&](int currentEnd) {
            int left = 0, right = n;
            while (left < right) {
                int mid = (left + right) / 2;
                if (events[mid][0] <= currentEnd)
                    left = mid + 1;
                else
                    right = mid;
            }
            return left;
        };

        function<int(int, int)> dfs = [&](int index, int count) -> int {
            if (count == 0 || index == n) return 0;
            if (dp[index][count] != -1) return dp[index][count];
            int next = searchNextEvent(events[index][1]);
            dp[index][count] = max(dfs(index + 1, count), events[index][2] + dfs(next, count - 1));
            return dp[index][count];
        };

        return dfs(0, k);
    }
};


// Bottom-Up approach
class Solution {
public:
    int maxValue(vector<vector<int>>& events, int k) {
        sort(events.begin(), events.end());
        int n = events.size();
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));

        auto searchNextEvent = [&](int currentEnd) {
            int left = 0, right = n;
            while (left < right) {
                int mid = (left + right) / 2;
                if (events[mid][0] <= currentEnd)
                    left = mid + 1;
                else
                    right = mid;
            }
            return left;
        };

        for (int i = n - 1; i >= 0; --i) {
            int next = searchNextEvent(events[i][1]);
            for (int cnt = 1; cnt <= k; ++cnt) {
                dp[i][cnt] = max(dp[i + 1][cnt], events[i][2] + dp[next][cnt - 1]);
            }
        }

        return dp[0][k];
    }
};
