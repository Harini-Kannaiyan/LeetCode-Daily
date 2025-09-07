//  Time: O(N)  ::  Space: O(N)
import java.util.*;

class Solution {
    public int[] sumZero(int n) {
        List<Integer> result = new ArrayList<>();
        if (n % 2 == 1) {
            result.add(0);
        }
        int index = n / 2 + 1;
        for (int i = 1; i < index; i++) {
            result.add(i);
            result.add(-i);
        }
        // Convert List to array
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
