//  Time: O(1)  ::  Space: O(1)
class Solution {
    findClosest(x, y, z) {
        const personOneDiff = Math.abs(z - x);
        const personTwoDiff = Math.abs(z - y);
        if (personOneDiff === personTwoDiff) return 0;
        return (personOneDiff < personTwoDiff) ? 1 : 2;
    }
}
