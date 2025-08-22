//  Time: O(M * N)  ::  Space: O(1)

class Solution {
    minimumArea(grid) {
        const n = grid.length, m = grid[0].length;
        let minX = n, maxX = 0, minY = m, maxY = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === 1) {
                    minX = Math.min(minX, i);
                    maxX = Math.max(maxX, i);
                    minY = Math.min(minY, j);
                    maxY = Math.max(maxY, j);
                }
            }
        }

        return (maxX - minX + 1) * (maxY - minY + 1);
    }
}
