class RouterSimple {
    constructor(memoryLimit) {
        this.dq = [];
        this.routerHashMap = new Set();
        this.memoryLimit = memoryLimit;
    }

    _packetKey(source, destination, timestamp) {
        return `${source},${destination},${timestamp}`;
    }

    addPacket(source, destination, timestamp) {
        let key = this._packetKey(source, destination, timestamp);
        if (this.routerHashMap.has(key)) return false;

        if (this.dq.length === this.memoryLimit) this.forwardPacket();

        this.dq.push([source, destination, timestamp]);
        this.routerHashMap.add(key);
        return true;
    }

    forwardPacket() {
        if (this.dq.length > 0) {
            let packet = this.dq.shift();
            let key = this._packetKey(...packet);
            this.routerHashMap.delete(key);
            return packet;
        }
        return [];
    }

    getCount(destination, startTime, endTime) {
        let count = 0;
        for (let [src, dst, ts] of this.dq) {
            if (dst === destination && startTime <= ts && ts <= endTime) count++;
        }
        return count;
    }
}

// ---------- Optimized ----------
class RouterOptimized {
    constructor(memoryLimit) {
        this.dq = [];
        this.routerHashMap = new Set();
        this.memoryLimit = memoryLimit;
        this.destinationMap = new Map(); // dest -> sorted array of timestamps
    }

    _packetKey(source, destination, timestamp) {
        return `${source},${destination},${timestamp}`;
    }

    addPacket(source, destination, timestamp) {
        let key = this._packetKey(source, destination, timestamp);
        if (this.routerHashMap.has(key)) return false;

        if (this.dq.length === this.memoryLimit) this.forwardPacket();

        this.dq.push([source, destination, timestamp]);
        this.routerHashMap.add(key);

        if (!this.destinationMap.has(destination)) {
            this.destinationMap.set(destination, []);
        }
        let arr = this.destinationMap.get(destination);
        let idx = this._bisectLeft(arr, timestamp);
        arr.splice(idx, 0, timestamp);
        return true;
    }

    forwardPacket() {
        if (this.dq.length > 0) {
            let packet = this.dq.shift();
            let key = this._packetKey(...packet);
            this.routerHashMap.delete(key);

            let [src, dst, ts] = packet;
            let arr = this.destinationMap.get(dst);
            let idx = this._bisectLeft(arr, ts);
            arr.splice(idx, 1);
            if (arr.length === 0) this.destinationMap.delete(dst);

            return packet;
        }
        return [];
    }

    getCount(destination, startTime, endTime) {
        if (!this.destinationMap.has(destination)) return 0;
        let arr = this.destinationMap.get(destination);
        let left = this._bisectLeft(arr, startTime);
        let right = this._bisectRight(arr, endTime);
        return right - left;
    }

    _bisectLeft(arr, x) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            let mid = Math.floor((lo + hi) / 2);
            if (arr[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    _bisectRight(arr, x) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            let mid = Math.floor((lo + hi) / 2);
            if (arr[mid] <= x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
