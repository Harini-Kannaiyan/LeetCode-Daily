# TLE  ::  Time: O(K * N)  ::   Space: O(N)
class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        passRatio = []

        for class_i in classes:
            ratio = class_i[0] / class_i[1]
            passRatio.append(initial_ratio)

        while extraStudents > 0:
            updatedRatios = []

            for class_ in classes:
                ratio = (class_[0] + 1) / (class_[1] + 1)
                updatedRatios.append(ratio)

            choosenClassIndex = 0
            maxGain = 0

            for i in range(len(updatedRatios)):
                gain = updatedRatios[i] - passRatio[i]
                if gain > maxGain:
                    choosenClassIndex = i
                    maxGain = gain

            passRatio[choosenClassIndex] = updatedRatios[choosenClassIndex]
            classes[choosenClassIndex][0] += 1
            classes[choosenClassIndex][1] += 1

            extraStudents -= 1

        totalPassRatio = sum(passRatio)
        return totalPassRatio / len(classes)



# Optimized  ::  Time: O((K + N) * Log(N))  ::   Space: O(N)
class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        def gain(passedStudents, totalStudents):
            return (passedStudents + 1) / (totalStudents + 1) - passedStudents / totalStudents

        # Max heap to store (-gain, passedStudents, totalStudents)
        maxHeap = []
        for passedStudents, totalStudents in classes:
            currGain = gain(passedStudents, totalStudents)
            maxHeap.append((-currGain, passedStudents, totalStudents))

        heapq.heapify(maxHeap)
        for _ in range(extraStudents):
            currGain, passedStudents, totalStudents = heapq.heappop(maxHeap)
            heapq.heappush(
                maxHeap,
                (
                    -gain(passedStudents + 1, totalStudents + 1),
                    passedStudents + 1,
                    totalStudents + 1,
                ),
            )

        totalPassRatio = sum(
            passedStudents / totalStudents for _, passedStudents, totalStudents in maxHeap
        )
        return totalPassRatio / len(classes)