import java.util.*;

class TaskManager {
    private Map<Integer, int[]> taskMap; // taskId -> [priority, userId]
    private PriorityQueue<int[]> globalHeap;

    public TaskManager(List<int[]> tasks) {
        taskMap = new HashMap<>();
        globalHeap = new PriorityQueue<>((a, b) -> {
            if (b[0] != a[0]) return b[0] - a[0]; // higher priority first
            return b[1] - a[1]; // higher taskId first
        });

        for (int[] t : tasks) {
            add(t[0], t[1], t[2]);
        }
    }

    public void add(int userId, int taskId, int priority) {
        taskMap.put(taskId, new int[]{priority, userId});
        globalHeap.offer(new int[]{priority, taskId});
    }

    public void edit(int taskId, int newPriority) {
        if (taskMap.containsKey(taskId)) {
            int userId = taskMap.get(taskId)[1];
            taskMap.put(taskId, new int[]{newPriority, userId});
            globalHeap.offer(new int[]{newPriority, taskId});
        }
    }

    public void rmv(int taskId) {
        taskMap.remove(taskId);
    }

    public int execTop() {
        while (!globalHeap.isEmpty()) {
            int[] top = globalHeap.poll();
            int priority = top[0], taskId = top[1];
            if (taskMap.containsKey(taskId) && taskMap.get(taskId)[0] == priority) {
                int userId = taskMap.get(taskId)[1];
                rmv(taskId);
                return userId;
            }
        }
        return -1;
    }
}
