import java.util.*;

class Solution {
    public boolean judgePoint24(int[] cards) {
        List<Double> nums = new ArrayList<>();
        for (int c : cards) nums.add((double)c);
        return solve(nums);
    }

    private boolean solve(List<Double> nums) {
        if (nums.size() == 1) {
            return Math.abs(nums.get(0) - 24) < 1e-6;
        }
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums.size(); j++) {
                if (i != j) {
                    List<Double> remaining = new ArrayList<>();
                    for (int k = 0; k < nums.size(); k++) {
                        if (k != i && k != j) remaining.add(nums.get(k));
                    }
                    double a = nums.get(i), b = nums.get(j);
                    double[] candidates = {a + b, a - b, b - a, a * b};

                    for (double val : candidates) {
                        List<Double> next = new ArrayList<>(remaining);
                        next.add(val);
                        if (solve(next)) return true;
                    }
                    if (Math.abs(b) > 1e-6) {
                        List<Double> next = new ArrayList<>(remaining);
                        next.add(a / b);
                        if (solve(next)) return true;
                    }
                    if (Math.abs(a) > 1e-6) {
                        List<Double> next = new ArrayList<>(remaining);
                        next.add(b / a);
                        if (solve(next)) return true;
                    }
                }
            }
        }
        return false;
    }
}
