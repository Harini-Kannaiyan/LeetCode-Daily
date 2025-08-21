class Solution {
    numSubmat(mat) {
        let m = mat.length, n = mat[0].length;
        let res = 0;
        let dp = Array.from({ length: m }, () => Array(n).fill(0));

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (j === 0) {
                    dp[i][j] = mat[i][j];
                } else {
                    dp[i][j] = (mat[i][j] === 0) ? 0 : dp[i][j - 1] + 1;
                }

                let cur = dp[i][j];
                for (let k = i; k >= 0; k--) {
                    cur = Math.min(cur, dp[k][j]);
                    if (cur === 0) break;
                    res += cur;
                }
            }
        }
        return res;
    }
}



class Solution {
    numSubmat(mat) {
        let m = mat.length, n = mat[0].length;
        let heights = Array(n).fill(0);
        let res = 0;

        for (let row of mat) {
            for (let i = 0; i < n; i++) {
                heights[i] = (row[i] === 0) ? 0 : heights[i] + 1;
            }

            let stack = [[-1, 0, -1]]; // [index, prevSum, height]
            for (let i = 0; i < n; i++) {
                let h = heights[i];
                while (stack[stack.length - 1][2] >= h) {
                    stack.pop();
                }
                let [j, prev, _] = stack[stack.length - 1];
                let cur = prev + (i - j) * h;
                stack.push([i, cur, h]);
                res += cur;
            }
        }
        return res;
    }
}

