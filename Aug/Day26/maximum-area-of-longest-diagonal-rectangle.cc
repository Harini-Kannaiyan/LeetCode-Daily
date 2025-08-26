//  Time: O(N)  ::  Space: O(1)
class Solution {
public:
    int areaOfMaxDiagonal(vector<vector<int>>& dimensions) {
        double longestDiagonal = 0;
        int areaOfLongestDiagonal = 0;

        for (auto& dim : dimensions) {
            int length = dim[0], width = dim[1];
            double diagonal = sqrt((length * length) + (width * width));
            int area = length * width;

            if (diagonal > longestDiagonal) {
                longestDiagonal = diagonal;
                areaOfLongestDiagonal = area;
            } else if (fabs(diagonal - longestDiagonal) < 1e-9) { // handle precision
                areaOfLongestDiagonal = max(areaOfLongestDiagonal, area);
            }
        }
        return areaOfLongestDiagonal;
    }
};
