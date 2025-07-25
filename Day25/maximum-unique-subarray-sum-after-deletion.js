// HashMap Approach  ::  Time: O(N) ::  Space: O(N)
class Solution {
    maxSum(nums) {
        const seen = new Set();
        let maxSum = -Infinity;
        let isFullNegative = true;

        for (let num of nums) {
            if (num >= 0) {
                isFullNegative = false;
                maxSum = 0;
            }
        }

        for (let num of nums) {
            if (isFullNegative) {
                maxSum = Math.max(maxSum, num);
            } else if (!seen.has(num) && num > 0) {
                seen.add(num);
                maxSum += num;
            }
        }

        return maxSum;
    }
}




// Sorting Approach  ::  Time: O(Nlogn) + O(N) ::  Space: O(1)
class Solution {
    maxSum(nums) {
        nums.sort((a, b) => a - b);
        let maxSum = -Infinity;
        let prev = -1;

        for (let num of nums) {
            if (num <= 0) {
                maxSum = Math.max(maxSum, num);
            } else if (num !== prev) {
                if (maxSum < 0) maxSum = 0;
                maxSum += num;
                prev = num;
            }
        }

        return maxSum;
    }
}
