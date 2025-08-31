#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        vector<unordered_set<char>> rows(9), cols(9), boxes(9);
        vector<pair<int,int>> empties;

        // Fill sets with initial numbers
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    empties.push_back({i, j});
                } else {
                    char num = board[i][j];
                    rows[i].insert(num);
                    cols[j].insert(num);
                    boxes[(i/3)*3 + j/3].insert(num);
                }
            }
        }

        function<bool(int)> backtrack = [&](int idx) {
            if (idx == empties.size()) return true;

            auto [i, j] = empties[idx];
            int b = (i/3)*3 + j/3;

            for (char c = '1'; c <= '9'; c++) {
                if (!rows[i].count(c) && !cols[j].count(c) && !boxes[b].count(c)) {
                    board[i][j] = c;
                    rows[i].insert(c);
                    cols[j].insert(c);
                    boxes[b].insert(c);

                    if (backtrack(idx+1)) return true;

                    board[i][j] = '.';
                    rows[i].erase(c);
                    cols[j].erase(c);
                    boxes[b].erase(c);
                }
            }
            return false;
        };

        backtrack(0);
    }
};
