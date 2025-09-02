//  Time: O(N ^ 3)  ::  Space: O(1)


class Solution {
public:
    int numberOfPairs(vector<vector<int>>& points) {
        int count = 0;
        int n = points.size();

        for (int i = 0; i < n; i++) {
            vector<int>& pointA = points[i];
            for (int j = 0; j < n; j++) {
                vector<int>& pointB = points[j];
                if (i == j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
                    continue;
                }
                if (n == 2) {
                    count++;
                    continue;
                }

                bool isPresentInside = false;
                for (int k = 0; k < n; k++) {
                    if (k == i || k == j) continue;
                    vector<int>& pointC = points[k];

                    bool isXPresentInside = (pointC[0] >= pointA[0] && pointC[0] <= pointB[0]);
                    bool isYPresentInside = (pointC[1] <= pointA[1] && pointC[1] >= pointB[1]);

                    if (isXPresentInside && isYPresentInside) {
                        isPresentInside = true;
                        break;
                    }
                }
                if (!isPresentInside) {
                    count++;
                }
            }
        }
        return count;
    }
};
