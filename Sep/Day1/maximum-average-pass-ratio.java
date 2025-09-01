// TLE  ::  Time: O(K * N)  ::   Space: O(N)
class Solution {
    public double maxAverageRatio(int[][] classes, int extraStudents) {
        int n = classes.length;
        double[] passRatio = new double[n];
        for (int i = 0; i < n; i++) {
            passRatio[i] = (double) classes[i][0] / classes[i][1];
        }

        while (extraStudents-- > 0) {
            double[] updatedRatios = new double[n];
            for (int i = 0; i < n; i++) {
                updatedRatios[i] = (double) (classes[i][0] + 1) / (classes[i][1] + 1);
            }

            int chosenIdx = 0;
            double maxGain = 0.0;
            for (int i = 0; i < n; i++) {
                double gain = updatedRatios[i] - passRatio[i];
                if (gain > maxGain) {
                    maxGain = gain;
                    chosenIdx = i;
                }
            }

            passRatio[chosenIdx] = updatedRatios[chosenIdx];
            classes[chosenIdx][0]++;
            classes[chosenIdx][1]++;
        }

        double total = 0;
        for (double r : passRatio) total += r;
        return total / n;
    }
}





// Optimized  ::  Time: O((K + N) * Log(N))  ::   Space: O(N)
import java.util.*;

class Solution {
    static class ClassData {
        int pass, total;
        ClassData(int p, int t) { pass = p; total = t; }
        double gain() {
            return (double)(pass + 1) / (total + 1) - (double)pass / total;
        }
    }

    public double maxAverageRatio(int[][] classes, int extraStudents) {
        PriorityQueue<ClassData> pq = new PriorityQueue<>((a, b) -> 
            Double.compare(b.gain(), a.gain())
        );

        for (int[] c : classes) pq.add(new ClassData(c[0], c[1]));

        while (extraStudents-- > 0) {
            ClassData top = pq.poll();
            top.pass++;
            top.total++;
            pq.add(top);
        }

        double total = 0;
        for (ClassData c : pq) {
            total += (double)c.pass / c.total;
        }
        return total / classes.length;
    }
}
