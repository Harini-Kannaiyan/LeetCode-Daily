class Solution {
    solveSudoku(board) {
        const rows = Array.from({ length: 9 }, () => new Set());
        const cols = Array.from({ length: 9 }, () => new Set());
        const boxes = Array.from({ length: 9 }, () => new Set());
        const empties = [];

        // Fill sets with initial numbers
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === ".") {
                    empties.push([i, j]);
                } else {
                    let num = board[i][j];
                    rows[i].add(num);
                    cols[j].add(num);
                    boxes[Math.floor(i/3)*3 + Math.floor(j/3)].add(num);
                }
            }
        }

        function backtrack(idx = 0) {
            if (idx === empties.length) return true;

            const [i, j] = empties[idx];
            const b = Math.floor(i/3)*3 + Math.floor(j/3);

            for (let c = 1; c <= 9; c++) {
                const ch = c.toString();
                if (!rows[i].has(ch) && !cols[j].has(ch) && !boxes[b].has(ch)) {
                    board[i][j] = ch;
                    rows[i].add(ch);
                    cols[j].add(ch);
                    boxes[b].add(ch);

                    if (backtrack(idx + 1)) return true;

                    board[i][j] = ".";
                    rows[i].delete(ch);
                    cols[j].delete(ch);
                    boxes[b].delete(ch);
                }
            }
            return false;
        }

        backtrack();
    }
}
