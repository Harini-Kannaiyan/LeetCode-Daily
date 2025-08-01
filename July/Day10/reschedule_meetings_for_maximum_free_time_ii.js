// Brute Force Approach => TC: O(N) | O(N)
class Solution {
    maxFreeTime(eventTime, startTime, endTime) {
        const n = startTime.length;
        let maxFreeTime = 0;
        let totalFreeTimeAvailableFromLeft = 0;
        const freeTimeAvailable = new Array(n).fill(false);
        let totalFreeTimeAvailableFromRight = 0;

        for (let i = 0; i < n; i++) {
            if (endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft) {
                freeTimeAvailable[i] = true;
            }
            totalFreeTimeAvailableFromLeft = Math.max(totalFreeTimeAvailableFromLeft, startTime[i] - (i === 0 ? 0 : endTime[i-1]));

            if (endTime[n-i-1] - startTime[n-i-1] <= totalFreeTimeAvailableFromRight) {
                freeTimeAvailable[n-i-1] = true;
            }
            totalFreeTimeAvailableFromRight = Math.max(totalFreeTimeAvailableFromRight, (i === 0 ? eventTime : startTime[n-i]) - endTime[n-i-1]);
        }

        for (let i = 0; i < n; i++) {
            const left = i === 0 ? 0 : endTime[i - 1];
            const right = i === n - 1 ? eventTime : startTime[i + 1];

            if (freeTimeAvailable[i]) {
                maxFreeTime = Math.max(maxFreeTime, right - left);
            } else {
                maxFreeTime = Math.max(maxFreeTime, right - left - (endTime[i] - startTime[i]));
            }
        }

        return maxFreeTime;
    }
}



// Optimized Approach => TC: O(N) | O(1)
class Solution {
    maxFreeTime(eventTime, startTime, endTime) {
        const n = startTime.length;
        let maxFreeTime = 0;
        let totalFreeTimeAvailableFromLeft = 0;
        let totalFreeTimeAvailableFromRight = 0;

        for (let i = 0; i < n; i++) {
            const left1 = i === 0 ? 0 : endTime[i - 1];
            const right1 = i === n - 1 ? eventTime : startTime[i + 1];

            if (endTime[i] - startTime[i] <= totalFreeTimeAvailableFromLeft) {
                maxFreeTime = Math.max(maxFreeTime, right1 - left1);
            }
            maxFreeTime = Math.max(maxFreeTime, right1 - left1 - (endTime[i] - startTime[i]));

            totalFreeTimeAvailableFromLeft = Math.max(totalFreeTimeAvailableFromLeft, startTime[i] - (i === 0 ? 0 : endTime[i - 1]));

            const left2 = i === n - 1 ? 0 : endTime[n - i - 2];
            const right2 = i === 0 ? eventTime : startTime[n - i];

            if (endTime[n - i - 1] - startTime[n - i - 1] <= totalFreeTimeAvailableFromRight) {
                maxFreeTime = Math.max(maxFreeTime, right2 - left2);
            }

            totalFreeTimeAvailableFromRight = Math.max(totalFreeTimeAvailableFromRight, (i === 0 ? eventTime : startTime[n - i]) - endTime[n - i - 1]);
        }

        return maxFreeTime;
    }
}

