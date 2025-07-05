function findLucky(arr) {
    const freq = new Map();
    for (const num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    let luckyNum = -1;
    for (const [key, val] of freq.entries()) {
        if (key === val) {
            luckyNum = Math.max(luckyNum, key);
        }
    }
    return luckyNum;
}
