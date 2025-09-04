//  Time: O(1)  ::  Space: O(1)
class Solution {
    public int findClosest(int x, int y, int z) {
        int personOneDiff = Math.abs(z - x);
        int personTwoDiff = Math.abs(z - y);
        if (personOneDiff == personTwoDiff) {
            return 0;
        }
        return (personOneDiff < personTwoDiff) ? 1 : 2;
    }
}
