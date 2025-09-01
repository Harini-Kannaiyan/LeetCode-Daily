// TLE  ::  Time: O(K * N)  ::   Space: O(N)
class Solution {
public:
    double maxAverageRatio(vector<vector<int>>& classes, int extraStudents) {
        int n = classes.size();
        vector<double> passRatio;
        for (auto &c : classes) {
            passRatio.push_back((double)c[0] / c[1]);
        }

        while (extraStudents-- > 0) {
            vector<double> updatedRatios;
            for (auto &c : classes) {
                updatedRatios.push_back((double)(c[0] + 1) / (c[1] + 1));
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
};




// Optimized  ::  Time: O((K + N) * Log(N))  ::   Space: O(N)
class Solution {
public:
    struct ClassData {
        int pass, total;
        double gain() const {
            return (double)(pass + 1) / (total + 1) - (double)pass / total;
        }
    };

    struct Compare {
        bool operator()(const ClassData& a, const ClassData& b) {
            return a.gain() < b.gain(); // max-heap
        }
    };

    double maxAverageRatio(vector<vector<int>>& classes, int extraStudents) {
        priority_queue<ClassData, vector<ClassData>, Compare> pq;
        for (auto &c : classes) pq.push({c[0], c[1]});

        while (extraStudents-- > 0) {
            auto top = pq.top(); pq.pop();
            top.pass++;
            top.total++;
            pq.push(top);
        }

        double total = 0;
        while (!pq.empty()) {
            auto c = pq.top(); pq.pop();
            total += (double)c.pass / c.total;
        }
        return total / classes.size();
    }
};
