import java.util.*;

public class Solution {
    // Time: N * Log(N) | Space: O(N)
    public long minimumDifference(int[] nums) {
        int n = nums.length / 3;

        long[] part1 = new long[n + 1];
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        long total = 0;

        for (int i = 0; i < n; i++) {
            total += nums[i];
            maxHeap.add(nums[i]);
        }

        part1[0] = total;

        for (int i = n; i < 2 * n; i++) {
            total += nums[i];
            maxHeap.add(nums[i]);
            total -= maxHeap.poll();
            part1[i - n + 1] = total;
        }

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        long part2 = 0;

        for (int i = 2 * n; i < 3 * n; i++) {
            part2 += nums[i];
            minHeap.add(nums[i]);
        }

        long ans = part1[n] - part2;

        for (int i = 2 * n - 1; i >= n; i--) {
            part2 += nums[i];
            minHeap.add(nums[i]);
            part2 -= minHeap.poll();
            ans = Math.min(ans, part1[i - n] - part2);
        }

        return ans;
    }
}
