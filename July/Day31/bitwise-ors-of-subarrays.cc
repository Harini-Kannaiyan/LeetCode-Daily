// Time: O(N * LogW)  ::  Space: O(N)
class Solution {
public:
    int subarrayBitwiseORs(vector<int>& arr) {
        unordered_set<int> ans, cur, temp;
        cur.insert(0);
        for (int x : arr) {
            temp.clear();
            temp.insert(x);
            for (int y : cur) {
                temp.insert(x | y);
            }
            cur = temp;
            for (int val : cur) {
                ans.insert(val);
            }
        }
        return ans.size();
    }
};
