class PriorityQueue {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    push(val) {
        this.heap.push(val);
        this._siftUp();
    }

    pop() {
        const top = this.top();
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._siftDown();
        }
        return top;
    }

    top() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    _siftUp() {
        let nodeIdx = this.heap.length - 1;
        while (nodeIdx > 0) {
            let parentIdx = Math.floor((nodeIdx - 1) / 2);
            if (this.compare(this.heap[nodeIdx], this.heap[parentIdx]) >= 0) break;
            [this.heap[nodeIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[nodeIdx]];
            nodeIdx = parentIdx;
        }
    }

    _siftDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let swapIdx = idx;

            if (left < length && this.compare(this.heap[left], this.heap[swapIdx]) < 0) {
                swapIdx = left;
            }

            if (right < length && this.compare(this.heap[right], this.heap[swapIdx]) < 0) {
                swapIdx = right;
            }

            if (swapIdx === idx) break;

            [this.heap[idx], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[idx]];
            idx = swapIdx;
        }
    }
}

class Solution {
    // Time: N * Log(N) | Space: O(N)
    minimumDifference(nums) {
        const n = Math.floor(nums.length / 3);

        const part1 = new Array(n + 1);
        let maxHeap = new PriorityQueue((a, b) => b - a);
        let total = nums.slice(0, n).reduce((a, b) => a + b, 0);

        for (let i = 0; i < n; i++) {
            maxHeap.push(nums[i]);
        }

        part1[0] = total;

        for (let i = n; i < 2 * n; i++) {
            total += nums[i];
            maxHeap.push(nums[i]);
            total -= maxHeap.pop();
            part1[i - n + 1] = total;
        }

        let minHeap = new PriorityQueue((a, b) => a - b);
        let part2 = nums.slice(2 * n).reduce((a, b) => a + b, 0);

        for (let i = 2 * n; i < 3 * n; i++) {
            minHeap.push(nums[i]);
        }

        let ans = part1[n] - part2;

        for (let i = 2 * n - 1; i >= n; i--) {
            part2 += nums[i];
            minHeap.push(nums[i]);
            part2 -= minHeap.pop();
            ans = Math.min(ans, part1[i - n] - part2);
        }

        return ans;
    }
}
