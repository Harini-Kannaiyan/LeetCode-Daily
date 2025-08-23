//  Time: O(N^2 & N^2)  ::  Space: O(N * M)

class Solution {
    public int minimumArea(int[][] grid, int y1, int y2, int x1, int x2) {
        int n = grid.length, m = grid[0].length;
        int minX = n, maxX = 0, minY = m, maxY = 0;

        for (int i = y1; i <= y2; i++) {
            for (int j = x1; j <= x2; j++) {
                if (grid[i][j] == 1) {
                    minX = Math.min(minX, i);
                    maxX = Math.max(maxX, i);
                    minY = Math.min(minY, j);
                    maxY = Math.max(maxY, j);
                }
            }
        }
        return (minX <= maxX) ? (maxX - minX + 1) * (maxY - minY + 1) : Integer.MAX_VALUE / 3;
    }

    public int[][] rotate(int[][] grid) {
        int n = grid.length;
        int m = (n > 0 ? grid[0].length : 0);
        int[][] rotated = new int[m][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                rotated[m - j - 1][i] = grid[i][j];
            }
        }
        return rotated;
    }

    public int solve(int[][] grid) {
        int n = grid.length;
        int m = (n > 0 ? grid[0].length : 0);
        int res = n * m;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < m - 1; j++) {
                res = Math.min(res,
                        minimumArea(grid, 0, i, 0, m - 1) +
                        minimumArea(grid, i + 1, n - 1, 0, j) +
                        minimumArea(grid, i + 1, n - 1, j + 1, m - 1));

                res = Math.min(res,
                        minimumArea(grid, 0, i, 0, j) +
                        minimumArea(grid, 0, i, j + 1, m - 1) +
                        minimumArea(grid, i + 1, n - 1, 0, m - 1));
            }
        }

        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                res = Math.min(res,
                        minimumArea(grid, 0, i, 0, m - 1) +
                        minimumArea(grid, i + 1, j, 0, m - 1) +
                        minimumArea(grid, j + 1, n - 1, 0, m - 1));
            }
        }
        return res;
    }

    public int minimumSum(int[][] grid) {
        int[][] rgrid = rotate(grid);
        return Math.min(solve(grid), solve(rgrid));
    }
}
