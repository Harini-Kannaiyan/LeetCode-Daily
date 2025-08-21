class Solution {
public:
    int numSubmat(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        int res = 0;
        vector<vector<int>> dp(m, vector<int>(n, 0));

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (j == 0) {
                    dp[i][j] = mat[i][j];
                } else {
                    dp[i][j] = (mat[i][j] == 0) ? 0 : dp[i][j - 1] + 1;
                }

                int cur = dp[i][j];
                for (int k = i; k >= 0; k--) {
                    cur = min(cur, dp[k][j]);
                    if (cur == 0) break;
                    res += cur;
                }
            }
        }
        return res;
    }
};


class Solution {
public:
    int numSubmat(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<int> heights(n, 0);
        int res = 0;

        for (auto& row : mat) {
            for (int i = 0; i < n; i++) {
                heights[i] = (row[i] == 0) ? 0 : heights[i] + 1;
            }

            vector<array<int,3>> stack = {{-1, 0, -1}}; // {index, curSum, height}
            for (int i = 0; i < n; i++) {
                int h = heights[i];
                while (!stack.empty() && stack.back()[2] >= h) {
                    stack.pop_back();
                }
                auto [j, prev, _] = stack.back();
                int cur = prev + (i - j) * h;
                stack.push_back({i, cur, h});
                res += cur;
            }
        }
        return res;
    }
};
