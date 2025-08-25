//  Time: O(M * N)  ::  Space: O(min(N, M))

class Solution {
public:
    // TC - O(M*N), SC - O(min(N, M))
    vector<int> findDiagonalOrder(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return {};
        
        int n = matrix.size(), m = matrix[0].size();
        vector<int> result;
        vector<int> temp;
        
        for (int headIndex = 0; headIndex < n + m - 1; headIndex++) {
            temp.clear();
            int row = (headIndex < m) ? 0 : headIndex - m + 1;
            int col = (headIndex < m) ? headIndex : m - 1;
            
            while (row < n && col >= 0) {
                temp.push_back(matrix[row][col]);
                row++;
                col--;
            }
            
            if (headIndex % 2 == 0)
                reverse(temp.begin(), temp.end());
            
            result.insert(result.end(), temp.begin(), temp.end());
        }
        return result;
    }
};
