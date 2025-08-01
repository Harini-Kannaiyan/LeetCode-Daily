function matchPlayersAndTrainers(players, trainers) {
    // Time: O(n * m) + (n * O(n) => remove operation), Space: O(1) => TLE case
    let count = 0;
    for (let i = 0; i < players.length; i++) {
        let minCap = Infinity;
        let selectedIndex = -1;

        for (let j = 0; j < trainers.length; j++) {
            if (players[i] <= trainers[j] && trainers[j] < minCap) {
                minCap = trainers[j];
                selectedIndex = j;
            }
        }

        if (selectedIndex !== -1) {
            count++;
            trainers.splice(selectedIndex, 1); // O(n)
        }
    }
    return count;
}



function matchPlayersAndTrainers(players, trainers) {
    // Time: O(n log n + m log m), Space: O(1)
    players.sort((a, b) => a - b);
    trainers.sort((a, b) => a - b);
    let i = 0, j = 0, count = 0;

    while (i < players.length && j < trainers.length) {
        if (players[i] <= trainers[j]) {
            count++;
            i++;
        }
        j++;
    }
    return count;
}
