class Solution {
// Time: O(N) :: Space: O(N)
public:
    string makeFancyString(string s) {
        string newStr = "";
        char prev = '\0';
        int frequency = 0;

        for (char ch : s) {
            if (ch == prev) {
                frequency++;
            } else {
                prev = ch;
                frequency = 1;
            }

            if (frequency < 3) {
                newStr += ch;
            }
        }

        return newStr;
    }
};


class Solution {
// Time: O(N) :: Space: O(1)
public:
    string makeFancyString(string s) {
        int j = 2;
        int n = s.length();
        if (n < 3) return s;

        for (int i = 2; i < n; ++i) {
            if (!(s[i] == s[j-1] && s[i] == s[j-2])) {
                s[j++] = s[i];
            }
        }

        return s.substr(0, j);
    }
};
