//  Time: O(N)  ::  Space: O(N)
class Solution {
    public int peopleAwareOfSecret(int n, int delay, int forget) {
        int mod = 1000000007;
        long[] peopleKnowsSecret = new long[n];
        peopleKnowsSecret[0] = 1;
        long knowsSecret = 0;

        for (int i = 1; i < n; i++) {
            knowsSecret = (knowsSecret 
                          + (i - delay >= 0 ? peopleKnowsSecret[i - delay] : 0) 
                          - (i - forget >= 0 ? peopleKnowsSecret[i - forget] : 0) 
                          + mod) % mod;
            peopleKnowsSecret[i] = knowsSecret;
        }

        long result = 0;
        for (int i = n - forget; i < n; i++) {
            if (i >= 0) result = (result + peopleKnowsSecret[i]) % mod;
        }
        return (int)result;
    }
}
