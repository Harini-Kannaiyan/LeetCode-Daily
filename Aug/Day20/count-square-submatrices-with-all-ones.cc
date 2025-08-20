// Time: O(M * N)  ::  Space: O(M * N)
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int n = matrix.size(), n1 = matrix[0].size();
        vector<vector<int>> dp(n, vector<int>(n1, 0));
        int sumOfSquareSubmatrices = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n1; j++) {
                if (i == 0 || j == 0 || matrix[i][j] == 0) {
                    dp[i][j] = matrix[i][j];
                } else {
                    dp[i][j] = min({dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]}) + 1;
                }
                sumOfSquareSubmatrices += dp[i][j];
            }
        }
        return sumOfSquareSubmatrices;
    }
};



//  Time: O(M * N)  ::  Space: O(N)
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int n = matrix.size(), n1 = matrix[0].size();
        vector<int> prev(n1, 0), curr(n1, 0);
        int sumOfSquareSubmatrices = 0;

        for (int i = 0; i < n; i++) {
            fill(curr.begin(), curr.end(), 0);
            for (int j = 0; j < n1; j++) {
                if (i == 0 || j == 0 || matrix[i][j] == 0) {
                    curr[j] = matrix[i][j];
                } else {
                    curr[j] = min({prev[j], prev[j - 1], curr[j - 1]}) + 1;
                }
                sumOfSquareSubmatrices += curr[j];
            }
            prev = curr;
        }
        return sumOfSquareSubmatrices;
    }
};

