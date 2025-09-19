#include <bits/stdc++.h>
using namespace std;

class Spreadsheet {
private:
    unordered_map<string, int> cellMap;

    vector<string> extractTokens(const string &formula) {
        vector<string> tokens;
        regex re("([A-Z]+\\d+|\\d+)");
        auto begin = sregex_iterator(formula.begin(), formula.end(), re);
        auto end = sregex_iterator();
        for (auto it = begin; it != end; ++it) {
            tokens.push_back(it->str());
        }
        return tokens;
    }

public:
    // Version 1: pre-populate cellMap
    Spreadsheet(int rows, bool prepopulate) {
        if (prepopulate) {
            for (int i = 1; i <= rows; i++) {
                for (char c = 'A'; c <= 'Z'; c++) {
                    string cell = string(1, c) + to_string(i);
                    cellMap[cell] = 0;
                }
            }
        }
    }

    void setCell(string cell, int value) {
        cellMap[cell] = value;
    }

    void resetCell(string cell) {
        cellMap[cell] = 0;
    }

    int getValue(string formula) {
        vector<string> tokens = extractTokens(formula);
        auto resolve = [&](string token) {
            if (all_of(token.begin(), token.end(), ::isdigit)) {
                return stoi(token);
            }
            return cellMap[token];
        };
        return resolve(tokens[0]) + resolve(tokens[1]);
    }
};
