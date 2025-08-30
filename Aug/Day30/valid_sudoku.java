class Solution {
    public boolean isValidSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    if (!isValid(i, j, board, board[i][j])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private boolean isValid(int row, int col, char[][] board, char c) {
        for (int i = 0; i < 9; i++) {
            int l = 3 * (row / 3) + i / 3;
            int r = 3 * (col / 3) + i % 3;

            if (i != col && board[row][i] == c) return false;
            if (i != row && board[i][col] == c) return false;
            if (l != row && r != col && board[l][r] == c) return false;
        }
        return true;
    }
}
