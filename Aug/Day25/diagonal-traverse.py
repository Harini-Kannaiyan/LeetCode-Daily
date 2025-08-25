#  Time: O(M * N)  ::  Space: O(min(N, M))
class Solution:
    def findDiagonalOrder(self, matrix: List[List[int]]) -> List[int]:
        
        if not matrix or not matrix[0]:
            return []

        n, m = len(matrix), len(matrix[0])
        
        result, temp = [], []
        
       
        for headIndex in range(n+m-1):            
            temp.clear()
            row, col = 0 if headIndex < m else headIndex - m + 1, headIndex if headIndex < m else m - 1

            while row < n and col >= 0:
                temp.append(matrix[row][col])
                row += 1
                col -= 1
            if headIndex % 2 == 0:
                result.extend(temp[::-1])
            else:
                result.extend(temp)
        return result        