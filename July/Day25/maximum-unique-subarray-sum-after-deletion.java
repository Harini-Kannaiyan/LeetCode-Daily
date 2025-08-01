// HashMap Approach  ::  Time: O(N) ::  Space: O(N)
class Solution {
    public int maxSum(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        int maxSum = Integer.MIN_VALUE;
        boolean isFullNegative = true;

        for (int num : nums) {
            if (num >= 0) {
                isFullNegative = false;
                maxSum = 0;
            }
        }

        for (int num : nums) {
            if (isFullNegative) {
                maxSum = Math.max(maxSum, num);
            } else if (num > 0 && !seen.contains(num)) {
                seen.add(num);
                maxSum += num;
            }
        }

        return maxSum;
    }
}



// Sorting Approach  ::  Time: O(Nlogn) + O(N) ::  Space: O(1)
class Solution {
    public int maxSum(int[] nums) {
        Arrays.sort(nums);
        int maxSum = Integer.MIN_VALUE;
        int prev = -1;

        for (int num : nums) {
            if (num <= 0) {
                maxSum = Math.max(maxSum, num);
            } else if (num != prev) {
                if (maxSum < 0) maxSum = 0;
                maxSum += num;
                prev = num;
            }
        }

        return maxSum;
    }
}

