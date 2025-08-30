class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        def isValid(row, col, board, c):
            for i in range(len(board)):
                l, r = (3 * (row//3)+ i//3) ,(3 * (col//3)+ i%3)
                if i!= col and board[row][i] == c:
                    return False
                elif i!= row and board[i][col] == c:
                    return False
                elif l!= row and r!= col and board[l][r] == c:
                    return False
            return True

        for i in range(len(board)):
            for j in range(len(board[i])):
                if board[i][j] != '.' :
                    if not isValid(i, j, board, board[i][j]):
                        return False
        return True