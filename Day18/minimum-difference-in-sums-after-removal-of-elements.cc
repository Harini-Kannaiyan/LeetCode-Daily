class Solution {
// Time: N * Log(N) | Space: O(N)
public:
    long long minimumDifference(vector<int>& nums) {
        int n = nums.size() / 3;

        vector<long long> part1(n + 1);
        priority_queue<int> maxHeap; // Max heap
        long long total = accumulate(nums.begin(), nums.begin() + n, 0LL);

        for (int i = 0; i < n; ++i) {
            maxHeap.push(nums[i]);
        }
        part1[0] = total;

        for (int i = n; i < 2 * n; ++i) {
            total += nums[i];
            maxHeap.push(nums[i]);
            total -= maxHeap.top();
            maxHeap.pop();
            part1[i - n + 1] = total;
        }

        priority_queue<int, vector<int>, greater<int>> minHeap; // Min heap
        long long part2 = accumulate(nums.begin() + 2 * n, nums.end(), 0LL);
        for (int i = 2 * n; i < 3 * n; ++i) {
            minHeap.push(nums[i]);
        }

        long long ans = part1[n] - part2;

        for (int i = 2 * n - 1; i >= n; --i) {
            part2 += nums[i];
            minHeap.push(nums[i]);
            part2 -= minHeap.top();
            minHeap.pop();
            ans = min(ans, part1[i - n] - part2);
        }

        return ans;
    }
};
