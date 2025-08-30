class Solution {
    isValidSudoku(board) {
        const isValid = (row, col, board, c) => {
            for (let i = 0; i < 9; i++) {
                let l = 3 * Math.floor(row / 3) + Math.floor(i / 3);
                let r = 3 * Math.floor(col / 3) + (i % 3);

                if (i !== col && board[row][i] === c) return false;
                if (i !== row && board[i][col] === c) return false;
                if (l !== row && r !== col && board[l][r] === c) return false;
            }
            return true;
        };

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== ".") {
                    if (!isValid(i, j, board, board[i][j])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
