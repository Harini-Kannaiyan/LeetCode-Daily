/* 
    Approach: Incremental counting approach
    Time: O(N)  ::  Space: O(1)
*/ 
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long totalZeroFilledSubarrays = 0, currentZeroFilledSubarrays = 0;
        for (int num : nums) {
            if (num == 0) {
                currentZeroFilledSubarrays++;
                totalZeroFilledSubarrays += currentZeroFilledSubarrays;
            } else {
                currentZeroFilledSubarrays = 0;
            }
        }
        return totalZeroFilledSubarrays;
    }
};



/* 
    Approach: Arithmetic series formula
    Time: O(N)  ::  Space: O(1)
*/ 
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long totalZeroFilledSubarrays = 0, currentZeroFilledSubarrays = 0;
        for (int num : nums) {
            if (num != 0) {
                long long cnt = (currentZeroFilledSubarrays * (currentZeroFilledSubarrays + 1)) / 2;
                totalZeroFilledSubarrays += cnt;
                currentZeroFilledSubarrays = 0;
            } else {
                currentZeroFilledSubarrays++;
            }
        }
        if (currentZeroFilledSubarrays != 0) {
            long long cnt = (currentZeroFilledSubarrays * (currentZeroFilledSubarrays + 1)) / 2;
            totalZeroFilledSubarrays += cnt;
        }
        return totalZeroFilledSubarrays;
    }
};

