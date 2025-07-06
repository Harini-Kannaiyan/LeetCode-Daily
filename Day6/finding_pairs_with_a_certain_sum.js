class FindSumPairs {
    constructor(nums1, nums2) {
        this.nums1 = [...nums1];
        this.nums2 = [...nums2];
        this.freqMap = new Map();
        for (let num of nums2) {
            this.freqMap.set(num, (this.freqMap.get(num) || 0) + 1);
        }
    }

    add(index, val) {
        const prevVal = this.nums2[index];
        this.nums2[index] += val;

        this.freqMap.set(prevVal, this.freqMap.get(prevVal) - 1);
        if (this.freqMap.get(prevVal) === 0) {
            this.freqMap.delete(prevVal);
        }

        const newVal = this.nums2[index];
        this.freqMap.set(newVal, (this.freqMap.get(newVal) || 0) + 1);
    }

    count(tot) {
        let cnt = 0;
        for (let num1 of this.nums1) {
            const num2 = tot - num1;
            cnt += this.freqMap.get(num2) || 0;
        }
        return cnt;
    }
}
