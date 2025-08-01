// Top-Down approach
function maxValue(events, k) {
    events.sort((a, b) => a[0] - b[0]);
    const n = events.length;
    const dp = Array.from({ length: n }, () => Array(k + 1).fill(-1));

    function searchNextEvent(currentEnd) {
        let left = 0, right = n;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][0] <= currentEnd) left = mid + 1;
            else right = mid;
        }
        return left;
    }

    function dfs(index, count) {
        if (count === 0 || index === n) return 0;
        if (dp[index][count] !== -1) return dp[index][count];

        const next = searchNextEvent(events[index][1]);
        dp[index][count] = Math.max(
            dfs(index + 1, count),
            events[index][2] + dfs(next, count - 1)
        );
        return dp[index][count];
    }

    return dfs(0, k);
}


// Bottom-Up approach
function maxValue(events, k) {
    events.sort((a, b) => a[0] - b[0]);
    const n = events.length;
    const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

    function searchNextEvent(currentEnd) {
        let left = 0, right = n;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][0] <= currentEnd) left = mid + 1;
            else right = mid;
        }
        return left;
    }

    for (let i = n - 1; i >= 0; i--) {
        const next = searchNextEvent(events[i][1]);
        for (let count = 1; count <= k; count++) {
            dp[i][count] = Math.max(
                dp[i + 1][count],
                events[i][2] + dp[next][count - 1]
            );
        }
    }

    return dp[0][k];
}

