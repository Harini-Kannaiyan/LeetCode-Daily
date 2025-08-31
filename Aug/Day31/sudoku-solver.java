import java.util.*;

class Solution {
    public void solveSudoku(char[][] board) {
        List<Set<Character>> rows = new ArrayList<>();
        List<Set<Character>> cols = new ArrayList<>();
        List<Set<Character>> boxes = new ArrayList<>();
        List<int[]> empties = new ArrayList<>();

        for (int i = 0; i < 9; i++) {
            rows.add(new HashSet<>());
            cols.add(new HashSet<>());
            boxes.add(new HashSet<>());
        }

        // Fill sets with initial numbers
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    empties.add(new int[]{i, j});
                } else {
                    char num = board[i][j];
                    rows.get(i).add(num);
                    cols.get(j).add(num);
                    boxes.get((i/3)*3 + j/3).add(num);
                }
            }
        }

        backtrack(board, rows, cols, boxes, empties, 0);
    }

    private boolean backtrack(char[][] board, List<Set<Character>> rows, List<Set<Character>> cols,
                              List<Set<Character>> boxes, List<int[]> empties, int idx) {
        if (idx == empties.size()) return true;

        int[] pos = empties.get(idx);
        int i = pos[0], j = pos[1];
        int b = (i/3)*3 + j/3;

        for (char c = '1'; c <= '9'; c++) {
            if (!rows.get(i).contains(c) && !cols.get(j).contains(c) && !boxes.get(b).contains(c)) {
                board[i][j] = c;
                rows.get(i).add(c);
                cols.get(j).add(c);
                boxes.get(b).add(c);

                if (backtrack(board, rows, cols, boxes, empties, idx+1)) return true;

                board[i][j] = '.';
                rows.get(i).remove(c);
                cols.get(j).remove(c);
                boxes.get(b).remove(c);
            }
        }
        return false;
    }
}
