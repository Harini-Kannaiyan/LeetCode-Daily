// Time: O(M * N)  ::  Space: O(M * N)
class Solution {
    countSquares(matrix) {
        let n = matrix.length, n1 = matrix[0].length;
        let dp = Array.from({ length: n }, () => Array(n1).fill(0));
        let sumOfSquareSubmatrices = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n1; j++) {
                if (i === 0 || j === 0 || matrix[i][j] === 0) {
                    dp[i][j] = matrix[i][j];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
                }
                sumOfSquareSubmatrices += dp[i][j];
            }
        }
        return sumOfSquareSubmatrices;
    }
}


//  Time: O(M * N)  ::  Space: O(N)
class Solution {
    countSquares(matrix) {
        let n = matrix.length, n1 = matrix[0].length;
        let prev = new Array(n1).fill(0);
        let curr = new Array(n1).fill(0);
        let sumOfSquareSubmatrices = 0;

        for (let i = 0; i < n; i++) {
            curr.fill(0);
            for (let j = 0; j < n1; j++) {
                if (i === 0 || j === 0 || matrix[i][j] === 0) {
                    curr[j] = matrix[i][j];
                } else {
                    curr[j] = Math.min(prev[j], prev[j - 1], curr[j - 1]) + 1;
                }
                sumOfSquareSubmatrices += curr[j];
            }
            prev = [...curr];
        }
        return sumOfSquareSubmatrices;
    }
}
