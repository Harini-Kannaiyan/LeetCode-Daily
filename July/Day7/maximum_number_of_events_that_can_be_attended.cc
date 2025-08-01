#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxEvents(vector<vector<int>>& events) {
        sort(events.begin(), events.end());
        priority_queue<int, vector<int>, greater<int>> pq;

        int j = 0, maxEvents = 0;
        int n = events.size();
        int maxDay = 0;

        for (const auto& event : events) {
            maxDay = max(maxDay, event[1]);
        }

        for (int day = 1; day <= maxDay; ++day) {
            while (j < n && events[j][0] <= day) {
                pq.push(events[j][1]);
                j++;
            }

            while (!pq.empty() && pq.top() < day) {
                pq.pop();
            }

            if (!pq.empty()) {
                pq.pop();
                maxEvents++;
            }
        }

        return maxEvents;
    }
};
