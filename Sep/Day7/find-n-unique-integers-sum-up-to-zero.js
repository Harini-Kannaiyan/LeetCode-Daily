//  Time: O(N)  ::  Space: O(N)
class Solution {
    sumZero(n) {
        const result = [];
        if (n % 2 === 1) {
            result.push(0);
        }
        const index = Math.floor(n / 2) + 1;
        for (let i = 1; i < index; i++) {
            result.push(i, -i);
        }
        return result;
    }
}
