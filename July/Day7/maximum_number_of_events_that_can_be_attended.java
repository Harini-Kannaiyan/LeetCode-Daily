import java.util.*;

class Solution {
    public int maxEvents(int[][] events) {
        Arrays.sort(events, Comparator.comparingInt(a -> a[0]));
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        int j = 0, maxEvents = 0;
        int n = events.length;
        int maxDay = 0;

        for (int[] event : events) {
            maxDay = Math.max(maxDay, event[1]);
        }

        for (int day = 1; day <= maxDay; day++) {
            while (j < n && events[j][0] <= day) {
                pq.offer(events[j][1]);
                j++;
            }

            while (!pq.isEmpty() && pq.peek() < day) {
                pq.poll();
            }

            if (!pq.isEmpty()) {
                pq.poll();
                maxEvents++;
            }
        }

        return maxEvents;
    }
}
