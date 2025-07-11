// Iterative Approach
// TC: MlogM(sort)+ M*N | SC: O(3N) = ~O(N)
class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));
        int[] meetingCount = new int[n];
        long[] roomAvailableTime = new long[n];

        for (int[] meeting : meetings) {
            long start = meeting[0], end = meeting[1];
            boolean assigned = false;
            int minRoom = 0;
            long minTime = Long.MAX_VALUE;

            for (int i = 0; i < n; i++) {
                if (roomAvailableTime[i] <= start) {
                    roomAvailableTime[i] = end;
                    meetingCount[i]++;
                    assigned = true;
                    break;
                }
                if (roomAvailableTime[i] < minTime) {
                    minTime = roomAvailableTime[i];
                    minRoom = i;
                }
            }

            if (!assigned) {
                roomAvailableTime[minRoom] += (end - start);
                meetingCount[minRoom]++;
            }
        }

        int maxIdx = 0;
        for (int i = 1; i < n; i++) {
            if (meetingCount[i] > meetingCount[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }
}





// Priority Queue Approach
// TC - MlogM(sort)+ MlogN(pushing and poping in PQ for M events)
// SC - O(3N) => O(N)
class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, Comparator.comparingInt(a -> a[0]));

        int[] meetingCount = new int[n];
        PriorityQueue<Integer> available = new PriorityQueue<>();
        for (int i = 0; i < n; i++) available.offer(i);

        // (endTime, roomIndex)
        PriorityQueue<long[]> occupied = new PriorityQueue<>((a, b) -> {
            if (a[0] == b[0]) return Long.compare(a[1], b[1]);
            return Long.compare(a[0], b[0]);
        });

        for (int[] meeting : meetings) {
            long start = meeting[0], end = meeting[1];

            while (!occupied.isEmpty() && occupied.peek()[0] <= start) {
                available.offer((int) occupied.poll()[1]);
            }

            int room;
            if (!available.isEmpty()) {
                room = available.poll();
                occupied.offer(new long[]{end, room});
            } else {
                long[] top = occupied.poll();
                room = (int) top[1];
                long newEnd = top[0] + (end - start);
                occupied.offer(new long[]{newEnd, room});
            }

            meetingCount[room]++;
        }

        int maxIdx = 0;
        for (int i = 1; i < n; i++) {
            if (meetingCount[i] > meetingCount[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }
}
