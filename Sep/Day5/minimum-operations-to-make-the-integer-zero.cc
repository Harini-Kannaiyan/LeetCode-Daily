class Solution {
public:
    int makeTheIntegerZero(long long num1, long long num2) {
        for (long long k = 1; ; k++) {
            long long x = num1 - num2 * k;
            if (x < k) return -1;
            if (k >= __builtin_popcountll(x)) return k;
        }
    }
};
