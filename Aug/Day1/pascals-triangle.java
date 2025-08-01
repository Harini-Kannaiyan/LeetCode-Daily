//  Time: O(N^2)  ::  Space: O(N^2)
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> pascalList = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();
        nums.add(1);
        pascalList.add(new ArrayList<>(nums));

        for (int i = 1; i < numRows; i++) {
            List<Integer> temp = new ArrayList<>();
            temp.add(1);
            for (int j = 1; j < nums.size(); j++) {
                temp.add(nums.get(j) + nums.get(j - 1));
            }
            temp.add(1);
            nums = temp;
            pascalList.add(new ArrayList<>(nums));
        }

        return pascalList;
    }
}
