//  Time: O(N^2 & N^2)  ::  Space: O(N * M)

class Solution {
    minimumArea(grid, y1, y2, x1, x2) {
        const n = grid.length, m = grid[0].length;
        let minX = n, maxX = 0, minY = m, maxY = 0;

        for (let i = y1; i <= y2; i++) {
            for (let j = x1; j <= x2; j++) {
                if (grid[i][j] === 1) {
                    minX = Math.min(minX, i);
                    maxX = Math.max(maxX, i);
                    minY = Math.min(minY, j);
                    maxY = Math.max(maxY, j);
                }
            }
        }
        return (minX <= maxX) ? (maxX - minX + 1) * (maxY - minY + 1) : Number.MAX_SAFE_INTEGER / 3;
    }

    rotate(grid) {
        const n = grid.length;
        const m = n > 0 ? grid[0].length : 0;
        const rotated = Array.from({ length: m }, () => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                rotated[m - j - 1][i] = grid[i][j];
            }
        }
        return rotated;
    }

    solve(grid) {
        const n = grid.length;
        const m = n > 0 ? grid[0].length : 0;
        let res = n * m;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < m - 1; j++) {
                res = Math.min(res,
                    this.minimumArea(grid, 0, i, 0, m - 1) +
                    this.minimumArea(grid, i + 1, n - 1, 0, j) +
                    this.minimumArea(grid, i + 1, n - 1, j + 1, m - 1)
                );

                res = Math.min(res,
                    this.minimumArea(grid, 0, i, 0, j) +
                    this.minimumArea(grid, 0, i, j + 1, m - 1) +
                    this.minimumArea(grid, i + 1, n - 1, 0, m - 1)
                );
            }
        }

        for (let i = 0; i < n - 2; i++) {
            for (let j = i + 1; j < n - 1; j++) {
                res = Math.min(res,
                    this.minimumArea(grid, 0, i, 0, m - 1) +
                    this.minimumArea(grid, i + 1, j, 0, m - 1) +
                    this.minimumArea(grid, j + 1, n - 1, 0, m - 1)
                );
            }
        }
        return res;
    }

    minimumSum(grid) {
        const rgrid = this.rotate(grid);
        return Math.min(this.solve(grid), this.solve(rgrid));
    }
}
