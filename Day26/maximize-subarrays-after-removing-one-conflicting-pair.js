// Time: O(N + M)  ::  Space: O(N) 
class Solution {
    maxSubarrays(n, conflictingPairs) {
        const INF = 2 ** 31 - 1;
        const bMin1 = new Array(n + 1).fill(INF);
        const bMin2 = new Array(n + 1).fill(INF);

        for (const [x, y] of conflictingPairs) {
            const a = Math.min(x, y);
            const b = Math.max(x, y);
            if (bMin1[a] > b) {
                bMin2[a] = bMin1[a];
                bMin1[a] = b;
            } else if (bMin2[a] > b) {
                bMin2[a] = b;
            }
        }

        let res = 0;
        let ib1 = n;
        let b2 = 0x3FFFFFFF;
        const delCount = new Array(n + 1).fill(0);

        for (let i = n; i >= 1; i--) {
            if (bMin1[ib1] > bMin1[i]) {
                b2 = Math.min(b2, bMin1[ib1]);
                ib1 = i;
            } else {
                b2 = Math.min(b2, bMin1[i]);
            }

            res += Math.min(bMin1[ib1], n + 1) - i;
            delCount[ib1] += Math.min(Math.min(b2, bMin2[ib1]), n + 1) - Math.min(bMin1[ib1], n + 1);
        }

        return res + Math.max(...delCount);
    }
}
