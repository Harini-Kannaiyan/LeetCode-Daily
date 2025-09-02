#  Time: O(N ^ 3)  ::  Space: O(1)
class Solution:
    def numberOfPairs(self, points: List[List[int]]) -> int:
        count = 0
        n = len(points)

        for i in range(n):
            pointA = points[i]
            for j in range(n):
                pointB = points[j]
                if i == j or not (
                    pointA[0] <= pointB[0] and pointA[1] >= pointB[1]
                ):
                    continue
                if n == 2:
                    count += 1
                    continue

                isPresentInside = False
                for k in range(n):
                    if k == i or k == j:
                        continue

                    pointC = points[k]
                    isXPresentInside= (
                       pointC[0] >= pointA[0] and pointC[0] <= pointB[0]
                    )
                    isYPresentInside = (
                       pointC[1] <= pointA[1] and pointC[1] >= pointB[1]
                    )
                    if isXPresentInside and isYPresentInside:
                        isPresentInside = True
                        break
                if not isPresentInside:
                    count += 1
        return count