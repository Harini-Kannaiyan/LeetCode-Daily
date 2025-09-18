class TaskManager {
    constructor(tasks) {
        this.taskMap = new Map(); // taskId -> [priority, userId]
        this.globalHeap = []; // max-heap simulated with array + sort

        for (let [userId, taskId, priority] of tasks) {
            this.add(userId, taskId, priority);
        }
    }

    add(userId, taskId, priority) {
        this.taskMap.set(taskId, [priority, userId]);
        this.globalHeap.push([priority, taskId]);
        this.globalHeap.sort((a, b) => b[0] - a[0] || b[1] - a[1]); // keep max-heap order
    }

    edit(taskId, newPriority) {
        if (this.taskMap.has(taskId)) {
            let [, userId] = this.taskMap.get(taskId);
            this.taskMap.set(taskId, [newPriority, userId]);
            this.globalHeap.push([newPriority, taskId]);
            this.globalHeap.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
        }
    }

    rmv(taskId) {
        this.taskMap.delete(taskId);
    }

    execTop() {
        while (this.globalHeap.length > 0) {
            let [priority, taskId] = this.globalHeap.shift();
            if (this.taskMap.has(taskId) && this.taskMap.get(taskId)[0] === priority) {
                let [, userId] = this.taskMap.get(taskId);
                this.rmv(taskId);
                return userId;
            }
        }
        return -1;
    }
}
