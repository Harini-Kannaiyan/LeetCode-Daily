// Time: O(M * N)  ::  Space: O(M * N)
class Solution {
    public int countSquares(int[][] matrix) {
        int n = matrix.length, n1 = matrix[0].length;
        int[][] dp = new int[n][n1];
        int sumOfSquareSubmatrices = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n1; j++) {
                if (i == 0 || j == 0 || matrix[i][j] == 0) {
                    dp[i][j] = matrix[i][j];
                } else {
                    dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i - 1][j - 1]), dp[i][j - 1]) + 1;
                }
                sumOfSquareSubmatrices += dp[i][j];
            }
        }
        return sumOfSquareSubmatrices;
    }
}




//  Time: O(M * N)  ::  Space: O(N)
class Solution {
    public int countSquares(int[][] matrix) {
        int n = matrix.length, n1 = matrix[0].length;
        int[] prev = new int[n1], curr = new int[n1];
        int sumOfSquareSubmatrices = 0;

        for (int i = 0; i < n; i++) {
            curr = new int[n1]; // reset
            for (int j = 0; j < n1; j++) {
                if (i == 0 || j == 0 || matrix[i][j] == 0) {
                    curr[j] = matrix[i][j];
                } else {
                    curr[j] = Math.min(Math.min(prev[j], prev[j - 1]), curr[j - 1]) + 1;
                }
                sumOfSquareSubmatrices += curr[j];
            }
            prev = curr.clone();
        }
        return sumOfSquareSubmatrices;
    }
}
