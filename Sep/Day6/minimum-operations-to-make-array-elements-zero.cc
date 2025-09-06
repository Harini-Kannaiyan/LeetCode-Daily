//  Time: O(N * Log(R))  :: Space: O(1)
class Solution {
public:
    long long minimumOperations(long long num) {
        long long binaryLength = 1;
        long long base = 1;
        long long count = 0;
        while (base <= num) {
            count += ((binaryLength + 1) / 2) * (min(base * 2 - 1, num) - base + 1);
            binaryLength++;
            base *= 2;
        }
        return count;
    }

    long long minOperations(vector<vector<long long>>& queries) {
        long long sumOfResults = 0;
        for (auto& query : queries) {
            sumOfResults += (minimumOperations(query[1]) - minimumOperations(query[0] - 1) + 1) / 2;
        }
        return sumOfResults;
    }
};
