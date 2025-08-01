// Iterative Approach
// TC: MlogM(sort)+ M*N | SC: O(3N) = ~O(N)
function mostBooked(n, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    const meetingsAttendedCount = Array(n).fill(0);
    const roomAvailableTime = Array(n).fill(0);

    for (const [start, end] of meetings) {
        let assigned = false;
        let minRoom = 0;
        let minTime = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < n; i++) {
            if (roomAvailableTime[i] <= start) {
                roomAvailableTime[i] = end;
                meetingsAttendedCount[i]++;
                assigned = true;
                break;
            }
            if (roomAvailableTime[i] < minTime) {
                minTime = roomAvailableTime[i];
                minRoom = i;
            }
        }

        if (!assigned) {
            roomAvailableTime[minRoom] += end - start;
            meetingsAttendedCount[minRoom]++;
        }
    }

    let maxMeetings = Math.max(...meetingsAttendedCount);
    return meetingsAttendedCount.indexOf(maxMeetings);
}






// Priority Queue Approach
// TC - MlogM(sort)+ MlogN(pushing and poping in PQ for M events)
// SC - O(3N) => O(N)
class MinHeap {
    constructor(compareFn) {
        this.data = [];
        this.compare = compareFn;
    }

    push(item) {
        this.data.push(item);
        this._siftUp();
    }

    pop() {
        if (this.size() === 0) return null;
        const top = this.data[0];
        const last = this.data.pop();
        if (this.size() > 0) {
            this.data[0] = last;
            this._siftDown();
        }
        return top;
    }

    peek() {
        return this.data[0] || null;
    }

    size() {
        return this.data.length;
    }

    _siftUp() {
        let node = this.data.length - 1;
        while (node > 0) {
            const parent = Math.floor((node - 1) / 2);
            if (this.compare(this.data[node], this.data[parent]) >= 0) break;
            [this.data[node], this.data[parent]] = [this.data[parent], this.data[node]];
            node = parent;
        }
    }

    _siftDown() {
        let node = 0;
        const length = this.data.length;
        while (true) {
            let left = 2 * node + 1;
            let right = 2 * node + 2;
            let smallest = node;

            if (left < length && this.compare(this.data[left], this.data[smallest]) < 0) {
                smallest = left;
            }
            if (right < length && this.compare(this.data[right], this.data[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === node) break;
            [this.data[node], this.data[smallest]] = [this.data[smallest], this.data[node]];
            node = smallest;
        }
    }
}

function mostBooked(n, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    const meetingsAttendedCount = Array(n).fill(0);
    const available = new MinHeap((a, b) => a - b);
    for (let i = 0; i < n; i++) available.push(i);

    // (endTime, room)
    const occupied = new MinHeap((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

    for (const [start, end] of meetings) {
        while (occupied.size() && occupied.peek()[0] <= start) {
            const [, room] = occupied.pop();
            available.push(room);
        }

        let room;
        if (available.size()) {
            room = available.pop();
            occupied.push([end, room]);
        } else {
            const [endTime, r] = occupied.pop();
            room = r;
            occupied.push([endTime + (end - start), room]);
        }

        meetingsAttendedCount[room]++;
    }

    return meetingsAttendedCount.indexOf(Math.max(...meetingsAttendedCount));
}

