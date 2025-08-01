class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }
    pop() {
        if (this.size() === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.size()) {
            this.heap[0] = end;
            this._sinkDown();
        }
        return min;
    }
    peek() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
    _bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (element >= parent) break;
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }
    _sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swap = null;

            if (leftIdx < length && this.heap[leftIdx] < element) {
                swap = leftIdx;
            }
            if (
                rightIdx < length &&
                this.heap[rightIdx] < (swap === null ? element : this.heap[leftIdx])
            ) {
                swap = rightIdx;
            }
            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

class Solution {
    maxEvents(events) {
        events.sort((a, b) => a[0] - b[0]);
        const maxDay = Math.max(...events.map(e => e[1]));
        const pq = new MinHeap();
        let j = 0, maxEvents = 0;

        for (let day = 1; day <= maxDay; day++) {
            while (j < events.length && events[j][0] <= day) {
                pq.push(events[j][1]);
                j++;
            }
            while (pq.size() && pq.peek() < day) {
                pq.pop();
            }
            if (pq.size()) {
                pq.pop();
                maxEvents++;
            }
        }
        return maxEvents;
    }
}
