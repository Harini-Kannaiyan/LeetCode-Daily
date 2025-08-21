class Solution {
    public int numSubmat(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int res = 0;
        int[][] dp = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (j == 0) {
                    dp[i][j] = mat[i][j];
                } else {
                    dp[i][j] = (mat[i][j] == 0) ? 0 : dp[i][j - 1] + 1;
                }

                int cur = dp[i][j];
                for (int k = i; k >= 0; k--) {
                    cur = Math.min(cur, dp[k][j]);
                    if (cur == 0) break;
                    res += cur;
                }
            }
        }
        return res;
    }
}



class Solution {
    public int numSubmat(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[] heights = new int[n];
        int res = 0;

        for (int[] row : mat) {
            for (int i = 0; i < n; i++) {
                heights[i] = (row[i] == 0) ? 0 : heights[i] + 1;
            }

            Stack<int[]> stack = new Stack<>();
            stack.push(new int[]{-1, 0, -1}); // {index, prevSum, height}

            for (int i = 0; i < n; i++) {
                int h = heights[i];
                while (stack.peek()[2] >= h) {
                    stack.pop();
                }
                int[] top = stack.peek();
                int j = top[0], prev = top[1];
                int cur = prev + (i - j) * h;
                stack.push(new int[]{i, cur, h});
                res += cur;
            }
        }
        return res;
    }
}

