// Time: O(N^2)  ::  Space: O(N)
var maximumUniqueSubarray = function(nums) {
    let uniqueElements = [];
    let maxScore = -1, currSum = 0;

    for (let num of nums) {
        let index = uniqueElements.indexOf(num);
        if (index !== -1) {
            for (let i = 0; i <= index; i++) {
                currSum -= uniqueElements[i];
            }
            uniqueElements = uniqueElements.slice(index + 1);
        }
        uniqueElements.push(num);
        currSum += num;
        maxScore = Math.max(maxScore, currSum);
    }
    return maxScore;
};




// Time: O(N)  ::  Space: O(N)
var maximumUniqueSubarray = function(nums) {
    let uniqueElements = new Set();
    let left = 0, currSum = 0, maxScore = 0;

    for (let right = 0; right < nums.length; right++) {
        while (uniqueElements.has(nums[right])) {
            currSum -= nums[left];
            uniqueElements.delete(nums[left]);
            left++;
        }
        currSum += nums[right];
        uniqueElements.add(nums[right]);
        maxScore = Math.max(maxScore, currSum);
    }
    return maxScore;
};
