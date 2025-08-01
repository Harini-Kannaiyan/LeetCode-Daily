class Solution {
// Time: O(N)  ::  Space: O(N)
public:
    int maximumGain(string s, int x, int y) {
        auto removeSubString = [](string word, string target) {
            string stack;
            int totalRemoved = 0;
            for (char ch : word) {
                if (!stack.empty() && ch == target[1] && stack.back() == target[0]) {
                    stack.pop_back();
                    totalRemoved += 2;
                } else {
                    stack.push_back(ch);
                }
            }
            return make_pair(stack, totalRemoved);
        };

        int maxScore = 0;
        string firstPair = (x > y) ? "ab" : "ba";
        string secondPair = (x > y) ? "ba" : "ab";

        auto [str1, count1] = removeSubString(s, firstPair);
        maxScore += (count1 / 2) * max(x, y);

        auto [str2, count2] = removeSubString(str1, secondPair);
        maxScore += (count2 / 2) * min(x, y);

        return maxScore;
    }
};




class Solution {
// Time: O(N)  ::  Space: O(1)
public:
    int removeSubString(vector<char>& s, string target) {
        int write = 0, count = 0;
        for (int read = 0; read < s.size(); ++read) {
            s[write++] = s[read];
            if (write > 1 && s[write - 2] == target[0] && s[write - 1] == target[1]) {
                write -= 2;
                count++;
            }
        }
        s.resize(write);
        return count;
    }

    int maximumGain(string s, int x, int y) {
        vector<char> chars(s.begin(), s.end());
        int maxScore = 0;
        if (x > y) {
            maxScore += x * removeSubString(chars, "ab");
            maxScore += y * removeSubString(chars, "ba");
        } else {
            maxScore += y * removeSubString(chars, "ba");
            maxScore += x * removeSubString(chars, "ab");
        }
        return maxScore;
    }
};
