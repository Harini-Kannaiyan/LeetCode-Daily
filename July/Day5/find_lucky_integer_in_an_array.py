class Solution:
    #Tc = 0(n), SC = o(n)
    def findLucky(self, arr: List[int]) -> int:
        numsCount = Counter(arr)
        luckyNum = -1
        for key, val in numsCount.items():
            if key == val:
                luckyNum = max(luckyNum, key)
        return luckyNum

class Solution:
    #TC = 0(n)+nlogn, SC = o(n)
    def findLucky(self, arr: List[int]) -> int:
        arr.sort()
        luckyNum = -1
        count, prev = 1, arr[0]

        for i in range(1, len(arr)):
            if arr[i] == arr[i-1]:
                count+=1
            else:
                if prev == count:
                    luckyNum = max(luckyNum, prev)
                prev = arr[i]
                count = 1

        if prev == count:
            luckyNum = max(luckyNum, prev)
        return luckyNum