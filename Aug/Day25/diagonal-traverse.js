//  Time: O(M * N)  ::  Space: O(min(N, M))

class Solution {
    findDiagonalOrder(matrix) {
        if (!matrix || matrix.length === 0 || matrix[0].length === 0) 
            return [];

        const n = matrix.length, m = matrix[0].length;
        const result = [];
        let temp = [];

        for (let headIndex = 0; headIndex < n + m - 1; headIndex++) {
            temp = [];
            let row = (headIndex < m) ? 0 : headIndex - m + 1;
            let col = (headIndex < m) ? headIndex : m - 1;

            while (row < n && col >= 0) {
                temp.push(matrix[row][col]);
                row++;
                col--;
            }

            if (headIndex % 2 === 0)
                temp.reverse();

            result.push(...temp);
        }

        return result;
    }
}
