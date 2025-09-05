class Solution {
    public int makeTheIntegerZero(int num1, int num2) {
        for (long k = 1; ; k++) {
            long x = (long) num1 - (long) num2 * k;
            if (x < k) return -1;
            if (k >= Long.bitCount(x)) return (int) k;
        }
    }
}
