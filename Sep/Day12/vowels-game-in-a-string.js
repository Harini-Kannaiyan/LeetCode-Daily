// Time: O(N)  ::  Space: O(1)
class Solution {
    doesAliceWin(s) {
        const vowels = "aeiou";
        for (const c of s) {
            if (vowels.includes(c)) {
                return true;
            }
        }
        return false;
    }
}
