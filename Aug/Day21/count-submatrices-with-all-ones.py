class Solution:
    #TC- O(m2*n), SC - O(m*n)
    def numSubmat(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        res = 0
        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if j == 0:
                    dp[i][j] = mat[i][j]
                else:
                    dp[i][j] = 0 if mat[i][j] == 0 else dp[i][j - 1] + 1
                cur = dp[i][j]
                for k in range(i, -1, -1):
                    cur = min(cur, dp[k][j])
                    if cur == 0:
                        break
                    res += cur
        return res

class Solution:
    def numSubmat(self, mat: List[List[int]]) -> int:
        heights = [0] * len(mat[0])
        res = 0
        for row in mat:
            for i, x in enumerate(row):
                heights[i] = 0 if x == 0 else heights[i] + 1
            stack = [[-1, 0, -1]]
            for i, h in enumerate(heights):             
                while stack[-1][2] >= h:
                    stack.pop()
                j, prev, _ = stack[-1]
                cur = prev + (i - j) * h
                stack.append([i, cur, h])
                res += cur
        return res