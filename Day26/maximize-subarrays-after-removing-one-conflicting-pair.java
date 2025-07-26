// Time: O(N + M)  ::  Space: O(N) 
class Solution {
    public int maxSubarrays(int n, List<List<Integer>> conflictingPairs) {
        int[] bMin1 = new int[n + 1];
        int[] bMin2 = new int[n + 1];
        Arrays.fill(bMin1, Integer.MAX_VALUE);
        Arrays.fill(bMin2, Integer.MAX_VALUE);

        for (List<Integer> pair : conflictingPairs) {
            int a = Math.min(pair.get(0), pair.get(1));
            int b = Math.max(pair.get(0), pair.get(1));
            if (bMin1[a] > b) {
                bMin2[a] = bMin1[a];
                bMin1[a] = b;
            } else if (bMin2[a] > b) {
                bMin2[a] = b;
            }
        }

        int res = 0;
        int ib1 = n;
        int b2 = 0x3FFFFFFF;
        int[] delCount = new int[n + 1];

        for (int i = n; i >= 1; i--) {
            if (bMin1[ib1] > bMin1[i]) {
                b2 = Math.min(b2, bMin1[ib1]);
                ib1 = i;
            } else {
                b2 = Math.min(b2, bMin1[i]);
            }

            res += Math.min(bMin1[ib1], n + 1) - i;
            delCount[ib1] += Math.min(Math.min(b2, bMin2[ib1]), n + 1) - Math.min(bMin1[ib1], n + 1);
        }

        int maxDel = 0;
        for (int val : delCount) {
            maxDel = Math.max(maxDel, val);
        }

        return res + maxDel;
    }
}
