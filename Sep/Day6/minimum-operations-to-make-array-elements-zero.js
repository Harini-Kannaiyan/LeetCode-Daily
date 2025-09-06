//  Time: O(N * Log(R))  :: Space: O(1)
class Solution {
    minimumOperations(num) {
        let binaryLength = 1;
        let base = 1;
        let count = 0n;  // use BigInt for safety

        num = BigInt(num);
        base = BigInt(base);

        while (base <= num) {
            count += BigInt((binaryLength + 1) >> 1) * (BigInt(Math.min(Number(base * 2n - 1n), Number(num))) - base + 1n);
            binaryLength++;
            base *= 2n;
        }
        return count;
    }

    minOperations(queries) {
        let sumOfResults = 0n;
        for (let query of queries) {
            let l = BigInt(query[0]);
            let r = BigInt(query[1]);
            sumOfResults += (this.minimumOperations(r) - this.minimumOperations(l - 1n) + 1n) / 2n;
        }
        return sumOfResults;
    }
}
