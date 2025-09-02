//  Time: O(N ^ 3)  ::  Space: O(1)

import java.util.*;

class Solution {
    public int numberOfPairs(int[][] points) {
        int count = 0;
        int n = points.length;

        for (int i = 0; i < n; i++) {
            int[] pointA = points[i];
            for (int j = 0; j < n; j++) {
                int[] pointB = points[j];
                if (i == j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
                    continue;
                }
                if (n == 2) {
                    count++;
                    continue;
                }

                boolean isPresentInside = false;
                for (int k = 0; k < n; k++) {
                    if (k == i || k == j) continue;
                    int[] pointC = points[k];

                    boolean isXPresentInside = (pointC[0] >= pointA[0] && pointC[0] <= pointB[0]);
                    boolean isYPresentInside = (pointC[1] <= pointA[1] && pointC[1] >= pointB[1]);

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
}
