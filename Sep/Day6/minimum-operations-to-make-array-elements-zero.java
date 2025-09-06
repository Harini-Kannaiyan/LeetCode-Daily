//  Time: O(N * Log(R))  :: Space: O(1)
class Solution {
    private long minimumOperations(long num) {
        long binaryLength = 1;
        long base = 1;
        long count = 0;
        while (base <= num) {
            count += ((binaryLength + 1) / 2) * (Math.min(base * 2 - 1, num) - base + 1);
            binaryLength++;
            base *= 2;
        }
        return count;
    }

    public long minOperations(int[][] queries) {
        long sumOfResults = 0;
        for (int[] query : queries) {
            sumOfResults += (minimumOperations(query[1]) - minimumOperations(query[0] - 1) + 1) / 2;
        }
        return sumOfResults;
    }
}
