#include <vector>
#include <unordered_map>
using namespace std;

class FindSumPairs {
    vector<int> nums1;
    vector<int> nums2;
    unordered_map<int, int> freqMap;

public:
    FindSumPairs(vector<int>& nums1, vector<int>& nums2) {
        this->nums1 = nums1;
        this->nums2 = nums2;
        for (int num : nums2) {
            freqMap[num]++;
        }
    }

    void add(int index, int val) {
        int prevVal = nums2[index];
        nums2[index] += val;

        freqMap[prevVal]--;
        if (freqMap[prevVal] == 0) {
            freqMap.erase(prevVal);
        }
        freqMap[nums2[index]]++;
    }

    int count(int tot) {
        int cnt = 0;
        for (int num1 : nums1) {
            int num2 = tot - num1;
            if (freqMap.count(num2)) {
                cnt += freqMap[num2];
            }
        }
        return cnt;
    }
};
