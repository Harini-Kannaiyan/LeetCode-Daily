#  Time: O(1)  ::  Space: O(1)
class Solution:
    def findClosest(self, x: int, y: int, z: int) -> int:
        personOneDiff = abs(z-x)
        personTwoDiff = abs(z-y)
        if personOneDiff == personTwoDiff:
            return 0
        return 1 if personOneDiff < personTwoDiff else 2