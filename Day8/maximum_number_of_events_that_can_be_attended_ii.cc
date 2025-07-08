#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    // Bottom-up approach
    int maxValue(vector<vector<int>>& events, int k) {
        sort(events.begin(), events.end());
        int n = events.size();
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));

        auto searchNextEvent = [&](int currentEnd) {
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
        };

        for (int i = n - 1; i >= 0; --i) {
            int nextIndex = searchNextEvent(events[i][1]);
            for (int cnt = 1; cnt <= k; ++cnt) {
                dp[i][cnt] = max(dp[i + 1][cnt], events[i][2] + dp[nextIndex][cnt - 1]);
            }
        }

        return dp[0][k];
    }
};
