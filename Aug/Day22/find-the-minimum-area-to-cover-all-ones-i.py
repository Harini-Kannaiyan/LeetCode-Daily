#  Time: O(M * N)  ::  Space: O(1)
class Solution:
    def minimumArea(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        minX, maxX = n, 0
        minY, maxY = m, 0

        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    minX = min(minX, i)
                    maxX = max(maxX, i)
                    minY = min(minY, j)
                    maxY = max(maxY, j)

        return (maxX - minX + 1) * (maxY - minY + 1)