/* 
    Approach: Incremental counting approach
    Time: O(N)  ::  Space: O(1)
*/ 
class Solution {
    zeroFilledSubarray(nums) {
        let totalZeroFilledSubarrays = 0, currentZeroFilledSubarrays = 0;
        for (let num of nums) {
            if (num === 0) {
                currentZeroFilledSubarrays++;
                totalZeroFilledSubarrays += currentZeroFilledSubarrays;
            } else {
                currentZeroFilledSubarrays = 0;
            }
        }
        return totalZeroFilledSubarrays;
    }
}




/* 
    Approach: Arithmetic series formula
    Time: O(N)  ::  Space: O(1)
*/ 
class Solution {
    zeroFilledSubarray(nums) {
        let totalZeroFilledSubarrays = 0, currentZeroFilledSubarrays = 0;
        for (let num of nums) {
            if (num !== 0) {
                let cnt = (currentZeroFilledSubarrays * (currentZeroFilledSubarrays + 1)) / 2;
                totalZeroFilledSubarrays += cnt;
                currentZeroFilledSubarrays = 0;
            } else {
                currentZeroFilledSubarrays++;
            }
        }
        if (currentZeroFilledSubarrays !== 0) {
            let cnt = (currentZeroFilledSubarrays * (currentZeroFilledSubarrays + 1)) / 2;
            totalZeroFilledSubarrays += cnt;
        }
        return totalZeroFilledSubarrays;
    }
}
