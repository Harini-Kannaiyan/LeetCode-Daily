//  Time: O(N * LogN)  ::  Space: O(1)
class Solution {
    public int[] getNoZeroIntegers(int n) {
        int a = 1, b = n - a;
        while ((String.valueOf(a).contains("0") || String.valueOf(b).contains("0")) && a <= b) {
            a++;
            b--;
        }
        return new int[]{a, b};
    }
}
