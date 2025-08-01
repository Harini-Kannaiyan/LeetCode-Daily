import java.util.*;

class FindSumPairs {
    private int[] nums1;
    private int[] nums2;
    private Map<Integer, Integer> freqMap;

    public FindSumPairs(int[] nums1, int[] nums2) {
        this.nums1 = nums1.clone();
        this.nums2 = nums2.clone();
        freqMap = new HashMap<>();
        for (int num : nums2) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
    }

    public void add(int index, int val) {
        int prevVal = nums2[index];
        nums2[index] += val;

        freqMap.put(prevVal, freqMap.get(prevVal) - 1);
        if (freqMap.get(prevVal) == 0) {
            freqMap.remove(prevVal);
        }

        freqMap.put(nums2[index], freqMap.getOrDefault(nums2[index], 0) + 1);
    }

    public int count(int tot) {
        int cnt = 0;
        for (int num1 : nums1) {
            int num2 = tot - num1;
            cnt += freqMap.getOrDefault(num2, 0);
        }
        return cnt;
    }
}
