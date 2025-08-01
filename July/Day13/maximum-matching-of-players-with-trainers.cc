class Solution {
// Time: O(n * m) + (n * O(n) => remove operation), Space: O(1) => TLE case
public:
    int matchPlayersAndTrainers(vector<int>& players, vector<int>& trainers) {
        int count = 0;
        for (int i = 0; i < players.size(); i++) {
            int minCap = INT_MAX;
            int selectedIndex = -1;
            for (int j = 0; j < trainers.size(); j++) {
                if (players[i] <= trainers[j] && trainers[j] < minCap) {
                    minCap = trainers[j];
                    selectedIndex = j;
                }
            }
            if (selectedIndex != -1) {
                count++;
                trainers.erase(trainers.begin() + selectedIndex);  // O(n)
            }
        }
        return count;
    }
};



class Solution {
// Time: O(n log n + m log m), Space: O(1)
public:
    int matchPlayersAndTrainers(vector<int>& players, vector<int>& trainers) {
        sort(players.begin(), players.end());
        sort(trainers.begin(), trainers.end());
        int i = 0, j = 0, count = 0;
        int n = players.size(), m = trainers.size();

        while (i < n && j < m) {
            if (players[i] <= trainers[j]) {
                count++;
                i++;
            }
            j++;
        }
        return count;
    }
};
