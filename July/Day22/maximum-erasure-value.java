class Solution {
    // Time: O(N^2)  ::  Space: O(N)
    public int maximumUniqueSubarray(int[] nums) {
        List<Integer> uniqueElements = new ArrayList<>();
        int maxScore = -1, currSum = 0;

        for (int num : nums) {
            if (uniqueElements.contains(num)) {
                int index = uniqueElements.indexOf(num);
                for (int i = 0; i <= index; i++) {
                    currSum -= uniqueElements.get(i);
                }
                uniqueElements = uniqueElements.subList(index + 1, uniqueElements.size());
            }
            uniqueElements.add(num);
            currSum += num;
            maxScore = Math.max(maxScore, currSum);
        }
        return maxScore;
    }
}



class Solution {
    // Time: O(N)  ::  Space: O(N)
    public int maximumUniqueSubarray(int[] nums) {
        Set<Integer> uniqueElements = new HashSet<>();
        int left = 0, currSum = 0, maxScore = 0;

        for (int right = 0; right < nums.length; right++) {
            while (uniqueElements.contains(nums[right])) {
                currSum -= nums[left];
                uniqueElements.remove(nums[left]);
                left++;
            }
            currSum += nums[right];
            uniqueElements.add(nums[right]);
            maxScore = Math.max(maxScore, currSum);
        }
        return maxScore;
    }
}
