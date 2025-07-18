class Solution:
    # Time: N * Log(N) | Space: O(N)
    def minimumDifference(self, nums: List[int]) -> int:
        n = len(nums) // 3

        part1 = [0] * (n + 1)
        # max heap
        total = sum(nums[:n])
        pq_left = [-x for x in nums[:n]]
        heapq.heapify(pq_left)
        part1[0] = total

        for i in range(n, n * 2):
            total += nums[i]
            heapq.heappush(pq_left, -nums[i])
            total -= -heapq.heappop(pq_left)
            part1[i - (n - 1)] = total

        # min heap
        part2 = sum(nums[n * 2 :])
        pq_right = nums[n * 2 :]
        heapq.heapify(pq_right)
        ans = part1[n] - part2

        for i in range(n * 2 - 1, n - 1, -1):
            part2 += nums[i]
            heapq.heappush(pq_right, nums[i])
            part2 -= heapq.heappop(pq_right)
            ans = min(ans, part1[i - n] - part2)

        return ans