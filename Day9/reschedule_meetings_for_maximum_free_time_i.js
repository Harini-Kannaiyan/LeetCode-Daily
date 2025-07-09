// Brute Force Approach => TC: O(N) | O(N)
class Solution {
    maxFreeTime(eventTime, k, startTime, endTime) {
        const n = startTime.length;
        const total = new Array(n + 1).fill(0);
        let maxFreeTime = 0;

        for (let i = 0; i < n; i++) {
            total[i + 1] = total[i] + (endTime[i] - startTime[i]);
        }

        for (let i = k - 1; i < n; i++) {
            const right = (i === n - 1) ? eventTime : startTime[i + 1];
            const left = (i === k - 1) ? 0 : endTime[i - k];
            maxFreeTime = Math.max(maxFreeTime, right - left - (total[i + 1] - total[i - k + 1]));
        }

        return maxFreeTime;
    }
}


// Optimized Approach => TC: O(N) | O(1)
class Solution {
    maxFreeTime(eventTime, k, startTime, endTime) {
        const n = startTime.length;
        let total = 0, maxFreeTime = 0;

        for (let i = 0; i < n; i++) {
            total += endTime[i] - startTime[i];
            const left = (i <= k - 1) ? 0 : endTime[i - k];
            const right = (i === n - 1) ? eventTime : startTime[i + 1];
            maxFreeTime = Math.max(maxFreeTime, right - left - total);

            if (i >= k - 1) {
                total -= endTime[i - k + 1] - startTime[i - k + 1];
            }
        }

        return maxFreeTime;
    }
}
