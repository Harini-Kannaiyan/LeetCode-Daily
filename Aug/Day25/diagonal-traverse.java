//  Time: O(M * N)  ::  Space: O(min(N, M))
class Solution {
    public int[] findDiagonalOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) 
            return new int[0];

        int n = matrix.length, m = matrix[0].length;
        List<Integer> result = new ArrayList<>();
        List<Integer> temp = new ArrayList<>();

        for (int headIndex = 0; headIndex < n + m - 1; headIndex++) {
            temp.clear();
            int row = (headIndex < m) ? 0 : headIndex - m + 1;
            int col = (headIndex < m) ? headIndex : m - 1;

            while (row < n && col >= 0) {
                temp.add(matrix[row][col]);
                row++;
                col--;
            }

            if (headIndex % 2 == 0)
                Collections.reverse(temp);

            result.addAll(temp);
        }

        return result.stream().mapToInt(i -> i).toArray();
    }
}
