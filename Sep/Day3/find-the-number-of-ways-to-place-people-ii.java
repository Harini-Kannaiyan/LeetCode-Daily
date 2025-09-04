//  Time: O(N ^ 2)  ::  Space: O(1)
class Solution {
    public int numberOfPairs(int[][] points) {
        List<int[]> pointList = new ArrayList<>();
        for (int[] p : points) {
            pointList.add(p);
        }

        Collections.sort(pointList, (a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            return Integer.compare(b[1], a[1]);
        });

        int count = 0;
        for (int i = 0; i < pointList.size(); ++i) {
            int xMaxLimit = Integer.MAX_VALUE;
            int yMinLimit = Integer.MIN_VALUE;

            for (int j = i + 1; j < pointList.size(); ++j) {
                if (pointList.get(j)[0] >= pointList.get(i)[0] && pointList.get(j)[0] < xMaxLimit &&
                    pointList.get(j)[1] <= pointList.get(i)[1] && pointList.get(j)[1] > yMinLimit) {
                    count++;
                    xMaxLimit = pointList.get(j)[0];
                    yMinLimit = pointList.get(j)[1];
                }
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] points = {{1, 1}, {2, 2}, {3, 3}};
        System.out.println("Number of pairs: " + sol.numberOfPairs(points)); // Example usage
    }
}