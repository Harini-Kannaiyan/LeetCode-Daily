class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        empties = []

        # Fill sets with initial numbers
        for i in range(9):
            for j in range(9):
                if board[i][j] == ".":
                    empties.append((i, j))
                else:
                    num = board[i][j]
                    rows[i].add(num)
                    cols[j].add(num)
                    boxes[(i//3)*3 + j//3].add(num)

        def backtrack(idx=0):
            if idx == len(empties):
                return True  # solved
            
            i, j = empties[idx]
            b = (i//3)*3 + j//3

            for c in map(str, range(1, 10)):
                if c not in rows[i] and c not in cols[j] and c not in boxes[b]:
                    # place number
                    board[i][j] = c
                    rows[i].add(c)
                    cols[j].add(c)
                    boxes[b].add(c)

                    if backtrack(idx + 1):
                        return True

                    # undo
                    board[i][j] = "."
                    rows[i].remove(c)
                    cols[j].remove(c)
                    boxes[b].remove(c)

            return False

        backtrack()