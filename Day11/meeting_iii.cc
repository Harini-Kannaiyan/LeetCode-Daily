// Iterative Approach
// TC: MlogM(sort)+ M*N | SC: O(3N) = ~O(N)
class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());
        vector<int> meetingsAttendedCount(n, 0);
        vector<long long> roomAvailableTime(n, 0);

        for (auto& meeting : meetings) {
            long long start = meeting[0], end = meeting[1];
            bool assigned = false;
            int minRoom = 0;
            long long minTime = LLONG_MAX;

            for (int i = 0; i < n; ++i) {
                if (roomAvailableTime[i] <= start) {
                    roomAvailableTime[i] = end;
                    meetingsAttendedCount[i]++;
                    assigned = true;
                    break;
                }
                if (roomAvailableTime[i] < minTime) {
                    minTime = roomAvailableTime[i];
                    minRoom = i;
                }
            }

            if (!assigned) {
                roomAvailableTime[minRoom] += (end - start);
                meetingsAttendedCount[minRoom]++;
            }
        }

        return max_element(meetingsAttendedCount.begin(), meetingsAttendedCount.end()) - meetingsAttendedCount.begin();
    }
};




// Priority Queue Approach
// TC - Mlogm(sort)+ MlogN(pushing and poping in PQ for M events)
// SC - o(3N) => o(N)
class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());

        vector<int> meetingsAttendedCount(n, 0);
        priority_queue<int, vector<int>, greater<int>> available;
        for (int i = 0; i < n; ++i) available.push(i);

        // (endTime, roomIndex)
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> occupied;

        for (auto& meeting : meetings) {
            long long start = meeting[0], end = meeting[1];

            while (!occupied.empty() && occupied.top().first <= start) {
                available.push(occupied.top().second);
                occupied.pop();
            }

            int room;
            if (!available.empty()) {
                room = available.top();
                available.pop();
                occupied.emplace(end, room);
            } else {
                auto [endTime, r] = occupied.top();
                occupied.pop();
                room = r;
                endTime += (end - start);
                occupied.emplace(endTime, room);
            }

            meetingsAttendedCount[room]++;
        }

        return max_element(meetingsAttendedCount.begin(), meetingsAttendedCount.end()) - meetingsAttendedCount.begin();
    }
};
