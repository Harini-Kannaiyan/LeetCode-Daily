//  Time: O(N^2)  
//  This is naive solution and will exceed time limit.
int longestSubarrayBrute(vector<int>& nums) {
    int n = nums.size();
    int longestOneSubarray = 0;
    for (int i = 0; i < n; i++) {
        int countZeros = 0;
        int j = i;
        for (; j < n; j++) {
            if (nums[j] == 0) countZeros++;
            if (countZeros > 1) {
                j--;
                break;
            }
        }
        longestOneSubarray = max(longestOneSubarray, j - i);
    }
    return longestOneSubarray;
}




// Optimized Solution  ::  Time: O(N)
int longestSubarray(vector<int>& nums) {
    int n = nums.size();
    int longestOneSubarray = 0, sum = 0, lo = 0;
    for (int hi = 0; hi < n; hi++) {
        sum += nums[hi];
        if (sum < hi - lo) {
            sum -= nums[lo];
            lo++;
        }
        longestOneSubarray = max(longestOneSubarray, hi - lo);
    }
    return longestOneSubarray;
}

