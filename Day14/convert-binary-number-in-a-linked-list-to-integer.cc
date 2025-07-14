class Solution {
// Time: O(N) | Space: O(N)
public:
    int getDecimalValue(ListNode* head) {
        std::vector<int> values;
        while (head != nullptr) {
            values.push_back(head->val);
            head = head->next;
        }

        int currVal = 0;
        for (int val : values) {
            currVal = 2 * currVal + val;
        }
        return currVal;
    }
};

class Solution {
//  Time: O(N) | Space: O(1)
public:
    int getDecimalValue(ListNode* head) {
        int currVal = 0;
        while (head != nullptr) {
            currVal = 2 * currVal + head->val;
            head = head->next;
        }
        return currVal;
    }
};