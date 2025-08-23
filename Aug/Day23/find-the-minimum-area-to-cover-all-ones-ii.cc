//  Time: O(N^2 & N^2)  ::  Space: O(N * M)

class Solution {
public:
    int minimumArea(vector<vector<int>>& grid, int y1, int y2, int x1, int x2) {
        int n = grid.size(), m = grid[0].size();
        int minX = n, maxX = 0, minY = m, maxY = 0;

        for (int i = y1; i <= y2; i++) {
            for (int j = x1; j <= x2; j++) {
                if (grid[i][j] == 1) {
                    minX = min(minX, i);
                    maxX = max(maxX, i);
                    minY = min(minY, j);
                    maxY = max(maxY, j);
                }
            }
        }
        return (minX <= maxX) ? (maxX - minX + 1) * (maxY - minY + 1) : INT_MAX / 3;
    }

    vector<vector<int>> rotate(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = (n > 0 ? grid[0].size() : 0);
        vector<vector<int>> rotated(m, vector<int>(n, 0));

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                rotated[m - j - 1][i] = grid[i][j];
            }
        }
        return rotated;
    }

    int solve(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = (n > 0 ? grid[0].size() : 0);
        int res = n * m;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < m - 1; j++) {
                res = min(res,
                          minimumArea(grid, 0, i, 0, m - 1) +
                          minimumArea(grid, i + 1, n - 1, 0, j) +
                          minimumArea(grid, i + 1, n - 1, j + 1, m - 1));

                res = min(res,
                          minimumArea(grid, 0, i, 0, j) +
                          minimumArea(grid, 0, i, j + 1, m - 1) +
                          minimumArea(grid, i + 1, n - 1, 0, m - 1));
            }
        }

        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                res = min(res,
                          minimumArea(grid, 0, i, 0, m - 1) +
                          minimumArea(grid, i + 1, j, 0, m - 1) +
                          minimumArea(grid, j + 1, n - 1, 0, m - 1));
            }
        }

        return res;
    }

    int minimumSum(vector<vector<int>>& grid) {
        vector<vector<int>> rgrid = rotate(grid);
        return min(solve(grid), solve(rgrid));
    }
};
