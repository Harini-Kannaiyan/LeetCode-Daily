class Solution {
    // Time: O(n * m) + (n * O(n) => remove operation), Space: O(1) => TLE case
    public int matchPlayersAndTrainers(int[] players, List<Integer> trainers) {
        int count = 0;
        for (int i = 0; i < players.length; i++) {
            int minCap = Integer.MAX_VALUE;
            int selectedIndex = -1;

            for (int j = 0; j < trainers.size(); j++) {
                if (players[i] <= trainers.get(j) && trainers.get(j) < minCap) {
                    minCap = trainers.get(j);
                    selectedIndex = j;
                }
            }

            if (selectedIndex != -1) {
                count++;
                trainers.remove(selectedIndex); // O(n)
            }
        }
        return count;
    }
}


class Solution {
    // Time: O(n log n + m log m), Space: O(1)
    public int matchPlayersAndTrainers(int[] players, int[] trainers) {
        Arrays.sort(players);
        Arrays.sort(trainers);
        int i = 0, j = 0, count = 0;

        while (i < players.length && j < trainers.length) {
            if (players[i] <= trainers[j]) {
                count++;
                i++;
            }
            j++;
        }
        return count;
    }
}