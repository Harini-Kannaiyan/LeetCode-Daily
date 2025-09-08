//  Time: O(N * LogN)  ::  Space: O(1)
class Solution {
    getNoZeroIntegers(n) {
        let a = 1, b = n - a;
        while ((a.toString().includes("0") || b.toString().includes("0")) && a <= b) {
            a++;
            b--;
        }
        return [a, b];
    }
}
