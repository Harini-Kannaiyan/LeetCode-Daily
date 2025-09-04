//  Time: O(1)  ::  Space: O(1)
class Solution {
public:
    // TC - O(1), SC - O(1)
    int findClosest(int x, int y, int z) {
        int personOneDiff = abs(z - x);
        int personTwoDiff = abs(z - y);
        if (personOneDiff == personTwoDiff) return 0;
        return (personOneDiff < personTwoDiff) ? 1 : 2;
    }
};
