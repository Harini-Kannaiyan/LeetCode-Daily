import java.util.*;

class Solution {
    public List<Integer> replaceNonCoprimes(int[] nums) {
        List<Integer> stack = new ArrayList<>();
        for (int num : nums) {
            while (!stack.isEmpty()) {
                int g = gcd(stack.get(stack.size() - 1), num);
                if (g == 1) break;
                num = (int)((1L * stack.remove(stack.size() - 1) * num) / g); // cast to long to avoid overflow
            }
            stack.add(num);
        }
        return stack;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
