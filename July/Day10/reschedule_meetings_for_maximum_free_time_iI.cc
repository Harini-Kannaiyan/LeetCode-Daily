// Brute Force Approach => TC: O(N) | O(N)
class Solution {
public:
    int maxFreeTime(int eventTime, vector<int>& startTime, vector<int>& endTime) {
        int n = startTime.size();
        int maxFreeTime = 0;
        int totalFreeTimeAvailableFromLeft = 0;
        vector<bool> freeTimeAvailable(n, false);
        int totalFreeTimeAvailableFromRight = 0;

        for (int i = 0; i < n; i++) {
            if (endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft) {
                freeTimeAvailable[i] = true;
            }
            totalFreeTimeAvailableFromLeft = max(totalFreeTimeAvailableFromLeft, startTime[i] - (i == 0 ? 0 : endTime[i-1]));

            if (endTime[n-i-1] - startTime[n-i-1] <= totalFreeTimeAvailableFromRight) {
                freeTimeAvailable[n-i-1] = true;
            }
            totalFreeTimeAvailableFromRight = max(totalFreeTimeAvailableFromRight, (i == 0 ? eventTime : startTime[n-i]) - endTime[n-i-1]);
        }

        for (int i = 0; i < n; i++) {
            int left = (i == 0) ? 0 : endTime[i - 1];
            int right = (i == n - 1) ? eventTime : startTime[i + 1];

            if (freeTimeAvailable[i]) {
                maxFreeTime = max(maxFreeTime, right - left);
            } else {
                maxFreeTime = max(maxFreeTime, right - left - (endTime[i] - startTime[i]));
            }
        }
        return maxFreeTime;
    }
};




// Optimized Approach => TC: O(N) | O(1)

class Solution {
public:
    int maxFreeTime(int eventTime, vector<int>& startTime, vector<int>& endTime) {
        int n = startTime.size();
        int maxFreeTime = 0;
        int totalFreeTimeAvailableFromLeft = 0;
        int totalFreeTimeAvailableFromRight = 0;

        for (int i = 0; i < n; i++) {
            int left1 = (i == 0) ? 0 : endTime[i - 1];
            int right1 = (i == n - 1) ? eventTime : startTime[i + 1];

            if (endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft) {
                maxFreeTime = max(maxFreeTime, right1 - left1);
            }
            maxFreeTime = max(maxFreeTime, right1 - left1 - (endTime[i] - startTime[i]));

            totalFreeTimeAvailableFromLeft = max(totalFreeTimeAvailableFromLeft, startTime[i] - (i == 0 ? 0 : endTime[i - 1]));

            int left2 = (i == n - 1) ? 0 : endTime[n - i - 2];
            int right2 = (i == 0) ? eventTime : startTime[n - i];

            if (endTime[n - i - 1] - startTime[n - i - 1] <= totalFreeTimeAvailableFromRight) {
                maxFreeTime = max(maxFreeTime, right2 - left2);
            }

            totalFreeTimeAvailableFromRight = max(totalFreeTimeAvailableFromRight, (i == 0 ? eventTime : startTime[n - i]) - endTime[n - i - 1]);
        }

        return maxFreeTime;
    }
};
