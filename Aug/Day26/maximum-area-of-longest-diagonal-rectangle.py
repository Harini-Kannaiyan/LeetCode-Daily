#  Time: O(N)  ::  Space: O(1)
class Solution:
    def areaOfMaxDiagonal(self, dimensions: List[List[int]]) -> int:
        longestDiagonal = 0
        areaOfLongestDiagonal = 0

        for length, width in dimensions:
            diagonal = math.sqrt((length*length)+(width*width))
            area = length*width
            if diagonal > longestDiagonal:
                areaOfLongestDiagonal = area
                longestDiagonal = diagonal 
            elif diagonal == longestDiagonal:
                areaOfLongestDiagonal = max(area, areaOfLongestDiagonal)
        return areaOfLongestDiagonal
        