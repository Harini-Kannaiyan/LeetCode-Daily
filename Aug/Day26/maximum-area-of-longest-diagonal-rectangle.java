//  Time: O(N)  ::  Space: O(1)
class Solution {
    public int areaOfMaxDiagonal(int[][] dimensions) {
        double longestDiagonal = 0;
        int areaOfLongestDiagonal = 0;

        for (int[] dim : dimensions) {
            int length = dim[0], width = dim[1];
            double diagonal = Math.sqrt((length * length) + (width * width));
            int area = length * width;

            if (diagonal > longestDiagonal) {
                longestDiagonal = diagonal;
                areaOfLongestDiagonal = area;
            } else if (diagonal == longestDiagonal) {
                areaOfLongestDiagonal = Math.max(areaOfLongestDiagonal, area);
            }
        }
        return areaOfLongestDiagonal;
    }
}
