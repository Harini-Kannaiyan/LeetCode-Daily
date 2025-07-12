var earliestAndLatest = function(n, firstPlayer, secondPlayer) {
    firstPlayer -= 1;
    secondPlayer -= 1;

    const dfs = (k, mask) => {
        let currentPlayers = [];
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) currentPlayers.push(i);
        }

        let eliminatedPlayers = [];
        while (currentPlayers.length > 1) {
            let p1 = currentPlayers.shift();
            let p2 = currentPlayers.pop();
            if ((p1 === firstPlayer && p2 === secondPlayer) ||
                (p1 === secondPlayer && p2 === firstPlayer)) {
                return [k, k];
            }
            if (p1 === firstPlayer || p1 === secondPlayer) {
                eliminatedPlayers.push([p2]);
            } else if (p2 === firstPlayer || p2 === secondPlayer) {
                eliminatedPlayers.push([p1]);
            } else {
                eliminatedPlayers.push([p1, p2]);
            }
        }

        let minRound = Infinity, maxRound = -Infinity;

        const backtrack = (i, chosen) => {
            if (i === eliminatedPlayers.length) {
                let newMask = mask;
                for (let j = 0; j < eliminatedPlayers.length; j++) {
                    newMask ^= (1 << eliminatedPlayers[j][chosen[j]]);
                }
                const [a, b] = dfs(k + 1, newMask);
                minRound = Math.min(minRound, a);
                maxRound = Math.max(maxRound, b);
                return;
            }

            for (let j = 0; j < eliminatedPlayers[i].length; j++) {
                chosen[i] = j;
                backtrack(i + 1, chosen);
            }
        };

        backtrack(0, []);
        return [minRound, maxRound];
    };

    return dfs(1, (1 << n) - 1);
};
