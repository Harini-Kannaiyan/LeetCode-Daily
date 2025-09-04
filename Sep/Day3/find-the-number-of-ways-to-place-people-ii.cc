//  Time: O(N ^ 2)  ::  Space: O(1)
class Solution {
public:
    int numberOfPairs(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            if (a[0] != b[0]) {
                return a[0] < b[0];
            }
            return a[1] > b[1];
        });

        int count = 0;
        for (int i = 0; i < points.size(); ++i) {
            int x_max_limit = INT_MAX;
            int y_min_limit = INT_MIN;
            
            for (int j = i + 1; j < points.size(); ++j) {
                if (points[j][0] >= points[i][0] && points[j][0] < x_max_limit && 
                    points[j][1] <= points[i][1] && points[j][1] > y_min_limit) {
                    count++;
                    x_max_limit = points[j][0];
                    y_min_limit = points[j][1];
                }
            }
        }
        return count;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> points = {{1,1},{2,2},{3,3}};
    cout << "Number of pairs: " << sol.numberOfPairs(points) << endl; // Example usage
    return 0;
}