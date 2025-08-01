var smallestSubarrays = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);
    const latest = new Array(32).fill(-1);

    for (let i = n - 1; i >= 0; i--) {
        let farthest = i;
        for (let b = 0; b < 32; b++) {
            if ((nums[i] >> b) & 1) {
                latest[b] = i;
            }
            if (latest[b] !== -1) {
                farthest = Math.max(farthest, latest[b]);
            }
        }
        result[i] = farthest - i + 1;
    }

    return result;
};
