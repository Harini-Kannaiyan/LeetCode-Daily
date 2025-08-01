//  Time: O(N^2)  ::  Space: O(N^2)
class Solution {
    generate(numRows) {
        let nums = [1];
        let pascalList = [nums];

        for (let i = 1; i < numRows; i++) {
            let temp = new Array(nums.length + 1).fill(1);
            for (let j = 1; j < temp.length - 1; j++) {
                temp[j] = nums[j] + nums[j - 1];
            }
            nums = temp;
            pascalList.push(nums);
        }

        return pascalList;
    }
}
