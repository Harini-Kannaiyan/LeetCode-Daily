#  Time: O(N^2 & N^2)  ::  Space: O(N * M)
class Solution:
    def minimumArea(self, grid, y1: int, y2: int, x1: int, x2: int
    )  -> int:
        n, m = len(grid), len(grid[0])
        minX, maxX = n, 0
        minY, maxY = m, 0

        for i in range(y1, y2+1):
            for j in range(x1, x2+1):
                if grid[i][j] == 1:
                    minX = min(minX, i)
                    maxX = max(maxX, i)
                    minY = min(minY, j)
                    maxY = max(maxY, j)

        return (maxX - minX + 1) * (maxY - minY + 1) if minX <= maxX else sys.maxsize // 3

    def rotate(self, grid):
        n = len(grid)
        m = len(grid[0]) if n > 0 else 0
        rotated = [[0] * n for _ in range(m)]

        for i in range(n):
            for j in range(m):
                rotated[m - j - 1][i] = grid[i][j]

        return rotated

    def solve(self, grid):
        n = len(grid)
        m = len(grid[0]) if n > 0 else 0
        res = n * m

        for i in range(n - 1):
            for j in range(m - 1):
                res = min(
                    res,
                    self.minimumArea(grid, 0, i, 0, m - 1)
                    + self.minimumArea(grid, i + 1, n - 1, 0, j)
                    + self.minimumArea(grid, i + 1, n - 1, j + 1, m - 1),
                )

                res = min(
                    res,
                    self.minimumArea(grid, 0, i, 0, j)
                    + self.minimumArea(grid, 0, i, j + 1, m - 1)
                    + self.minimumArea(grid, i + 1, n - 1, 0, m - 1),
                )

        for i in range(n - 2):
            for j in range(i + 1, n - 1):
                res = min(
                    res,
                    self.minimumArea(grid, 0, i, 0, m - 1)
                    + self.minimumArea(grid, i + 1, j, 0, m - 1)
                    + self.minimumArea(grid, j + 1, n - 1, 0, m - 1),
                )

        return res

    def minimumSum(self, grid: List[List[int]]) -> int:
        rgrid = self.rotate(grid)
        return min(self.solve(grid), self.solve(rgrid))