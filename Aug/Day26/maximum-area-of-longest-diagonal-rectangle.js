//  Time: O(N)  ::  Space: O(1)
class Solution {
    areaOfMaxDiagonal(dimensions) {
        let longestDiagonal = 0;
        let areaOfLongestDiagonal = 0;

        for (let [length, width] of dimensions) {
            let diagonal = Math.sqrt((length * length) + (width * width));
            let area = length * width;

            if (diagonal > longestDiagonal) {
                longestDiagonal = diagonal;
                areaOfLongestDiagonal = area;
            } else if (diagonal === longestDiagonal) {
                areaOfLongestDiagonal = Math.max(areaOfLongestDiagonal, area);
            }
        }
        return areaOfLongestDiagonal;
    }
}
