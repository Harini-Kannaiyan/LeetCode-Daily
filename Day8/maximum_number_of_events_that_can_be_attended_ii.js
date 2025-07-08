function maxValue(events, k) {
    events.sort((a, b) => a[0] - b[0]);
    const n = events.length;
    const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

    function searchNextEvent(currentEnd) {
        let left = 0, right = n;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][0] <= currentEnd) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    for (let i = n - 1; i >= 0; i--) {
        const nextIndex = searchNextEvent(events[i][1]);
        for (let cnt = 1; cnt <= k; cnt++) {
            dp[i][cnt] = Math.max(dp[i + 1][cnt], events[i][2] + dp[nextIndex][cnt - 1]);
        }
    }

    return dp[0][k];
}
