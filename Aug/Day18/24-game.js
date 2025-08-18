class Solution {
    judgePoint24(cards) {
        const solve = (nums) => {
            if (nums.length === 1) {
                return Math.abs(nums[0] - 24) < 1e-6;
            }
            for (let i = 0; i < nums.length; i++) {
                for (let j = 0; j < nums.length; j++) {
                    if (i !== j) {
                        let remaining = [];
                        for (let k = 0; k < nums.length; k++) {
                            if (k !== i && k !== j) remaining.push(nums[k]);
                        }
                        let a = nums[i], b = nums[j];
                        let candidates = [a + b, a - b, b - a, a * b];

                        for (let val of candidates) {
                            if (solve([...remaining, val])) return true;
                        }
                        if (Math.abs(b) > 1e-6) {
                            if (solve([...remaining, a / b])) return true;
                        }
                        if (Math.abs(a) > 1e-6) {
                            if (solve([...remaining, b / a])) return true;
                        }
                    }
                }
            }
            return false;
        };
        return solve(cards.map(c => c * 1.0));
    }
}
