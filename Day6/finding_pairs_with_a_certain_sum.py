class FindSumPairs:

    def __init__(self, nums1: List[int], nums2: List[int]):
        self.nums1 = nums1[:]
        self.nums2 = nums2[:]
        self.freqMap = Counter(nums2)

    def add(self, index: int, val: int) -> None:
        prevVal = self.nums2[index]
        self.nums2[index] += val
        self.freqMap[prevVal] -= 1
        if self.freqMap[prevVal] == 0:
            del self.freqMap[prevVal]
        self.freqMap[self.nums2[index]] += 1

    def count(self, tot: int) -> int:
        cnt = 0
        for num1 in self.nums1:
            num2 = tot - num1
            cnt += self.freqMap.get(num2, 0)
        return cnt
