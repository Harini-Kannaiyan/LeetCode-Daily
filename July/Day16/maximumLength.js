function maximumLength(nums) {
    let maxSubSequence = 0;
    const patterns = [
        [0, 0],
        [1, 1],
        [0, 1],
        [1, 0]
    ];

    for (const pattern of patterns) {
        let count = 0;
        for (const num of nums) {
            if (num % 2 === pattern[count % 2]) {
                count++;
            }
        }
        maxSubSequence = Math.max(maxSubSequence, count);
    }

    return maxSubSequence;
}
