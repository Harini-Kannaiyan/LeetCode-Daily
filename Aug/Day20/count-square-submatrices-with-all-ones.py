# Time: O(M * N)  ::  Space: O(M * N)
class Solution:
    def countSquares(self, matrix: List[List[int]]) -> int:
        n= len(matrix)
        n1 = len(matrix[0])
        dp = [[0 for _ in range(n1)] for _ in range(n)]
        sumOfSquareSubmatrices = 0
        for i in range(n):
            for j in range(n1):
                if i==0 or j == 0 or matrix[i][j] == 0:
                    dp[i][j] = matrix[i][j]
                else :
                    dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1])+1
                sumOfSquareSubmatrices+=dp[i][j]
        return sumOfSquareSubmatrices



# Time: O(M * N)  ::  Space: O(N)
class Solution:
    def countSquares(self, matrix: List[List[int]]) -> int:
        n= len(matrix)
        n1 = len(matrix[0])
        prev = [0 for _ in range(n1)]
        sumOfSquareSubmatrices = 0
        for i in range(n):
            curr = [0 for _ in range(n1)]
            for j in range(n1):
                if i==0 or j == 0 or matrix[i][j] == 0:
                    curr[j] = matrix[i][j]
                else :
                    curr[j] = min(prev[j], prev[j-1], curr[j-1])+1
                sumOfSquareSubmatrices+=curr[j]
            prev = curr
        return sumOfSquareSubmatrices