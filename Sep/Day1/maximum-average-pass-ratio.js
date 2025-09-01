// TLE  ::  Time: O(K * N)  ::   Space: O(N)
class Solution {
    maxAverageRatio(classes, extraStudents) {
        let passRatio = classes.map(c => c[0] / c[1]);

        while (extraStudents-- > 0) {
            let updatedRatios = classes.map(c => (c[0] + 1) / (c[1] + 1));

            let chosenIdx = 0;
            let maxGain = 0;
            for (let i = 0; i < updatedRatios.length; i++) {
                let gain = updatedRatios[i] - passRatio[i];
                if (gain > maxGain) {
                    maxGain = gain;
                    chosenIdx = i;
                }
            }

            passRatio[chosenIdx] = updatedRatios[chosenIdx];
            classes[chosenIdx][0]++;
            classes[chosenIdx][1]++;
        }

        let total = passRatio.reduce((a, b) => a + b, 0);
        return total / classes.length;
    }
}






// Optimized  ::  Time: O((K + N) * Log(N))  ::   Space: O(N)
class MaxHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }
    push(val) {
        this.data.push(val);
        this._siftUp(this.data.length - 1);
    }
    pop() {
        if (this.size() === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this._siftDown(0);
        return top;
    }
    size() { return this.data.length; }
    _siftUp(i) {
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.compare(this.data[i], this.data[p])) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }
    _siftDown(i) {
        let n = this.data.length;
        while (true) {
            let l = 2 * i + 1, r = 2 * i + 2, largest = i;
            if (l < n && this.compare(this.data[l], this.data[largest])) largest = l;
            if (r < n && this.compare(this.data[r], this.data[largest])) largest = r;
            if (largest !== i) {
                [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
                i = largest;
            } else break;
        }
    }
}

class Solution {
    maxAverageRatio(classes, extraStudents) {
        const gain = (p, t) => (p + 1) / (t + 1) - p / t;

        const heap = new MaxHeap((a, b) => a.gain > b.gain);
        for (let [p, t] of classes) {
            heap.push({ pass: p, total: t, gain: gain(p, t) });
        }

        while (extraStudents-- > 0) {
            let top = heap.pop();
            top.pass++;
            top.total++;
            top.gain = gain(top.pass, top.total);
            heap.push(top);
        }

        let total = 0;
        while (heap.size()) {
            let { pass, total: t } = heap.pop();
            total += pass / t;
        }
        return total / classes.length;
    }
}
