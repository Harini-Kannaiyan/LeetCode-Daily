class FoodRatings {
    constructor(foods, cuisines, ratings) {
        this.foodMap = new Map(); // food -> [rating, cuisine]
        this.cuisineMap = new Map(); // cuisine -> heap (array used as priority queue)

        for (let i = 0; i < foods.length; i++) {
            let food = foods[i], cuisine = cuisines[i], rating = ratings[i];
            this.foodMap.set(food, [rating, cuisine]);

            if (!this.cuisineMap.has(cuisine)) this.cuisineMap.set(cuisine, []);
            this._push(this.cuisineMap.get(cuisine), [-rating, food]); // store as minHeap by neg rating
        }
    }

    changeRating(food, newRating) {
        let [oldRating, cuisine] = this.foodMap.get(food);
        this.foodMap.set(food, [newRating, cuisine]);
        this._push(this.cuisineMap.get(cuisine), [-newRating, food]); // lazy update
    }

    highestRated(cuisine) {
        let heap = this.cuisineMap.get(cuisine);
        while (heap.length > 0) {
            let [negRating, food] = heap[0];
            let [actualRating] = this.foodMap.get(food);
            if (-negRating === actualRating) return food;
            this._pop(heap); // remove stale
        }
        return "";
    }

    // ---------- MinHeap helper functions ----------
    _push(heap, val) {
        heap.push(val);
        this._siftUp(heap, heap.length - 1);
    }
    _pop(heap) {
        let last = heap.pop();
        if (heap.length === 0) return last;
        let top = heap[0];
        heap[0] = last;
        this._siftDown(heap, 0);
        return top;
    }
    _siftUp(heap, idx) {
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this._cmp(heap[idx], heap[parent]) >= 0) break;
            [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
            idx = parent;
        }
    }
    _siftDown(heap, idx) {
        let n = heap.length;
        while (true) {
            let left = idx * 2 + 1, right = idx * 2 + 2, smallest = idx;
            if (left < n && this._cmp(heap[left], heap[smallest]) < 0) smallest = left;
            if (right < n && this._cmp(heap[right], heap[smallest]) < 0) smallest = right;
            if (smallest === idx) break;
            [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
            idx = smallest;
        }
    }
    _cmp(a, b) {
        if (a[0] !== b[0]) return a[0] - b[0]; // compare neg ratings
        return a[1].localeCompare(b[1]); // lexicographic
    }
}
