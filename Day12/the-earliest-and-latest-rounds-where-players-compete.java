import java.util.*;

class Solution {
    int n, firstPlayer, secondPlayer;

    public int[] earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        this.n = n;
        this.firstPlayer = firstPlayer - 1;
        this.secondPlayer = secondPlayer - 1;
        int[] result = dfs(1, (1 << n) - 1);
        return result;
    }

    private int[] dfs(int k, int mask) {
        Deque<Integer> currentPlayers = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) currentPlayers.add(i);
        }

        List<List<Integer>> eliminatedPlayers = new ArrayList<>();
        while (currentPlayers.size() > 1) {
            int p1 = currentPlayers.pollFirst();
            int p2 = currentPlayers.pollLast();
            if ((p1 == firstPlayer && p2 == secondPlayer) ||
                (p1 == secondPlayer && p2 == firstPlayer)) {
                return new int[]{k, k};
            }
            if (p1 == firstPlayer || p1 == secondPlayer) {
                eliminatedPlayers.add(Arrays.asList(p2));
            } else if (p2 == firstPlayer || p2 == secondPlayer) {
                eliminatedPlayers.add(Arrays.asList(p1));
            } else {
                eliminatedPlayers.add(Arrays.asList(p1, p2));
            }
        }

        int minRound = Integer.MAX_VALUE;
        int maxRound = Integer.MIN_VALUE;
        int[] chosen = new int[eliminatedPlayers.size()];

        backtrack(eliminatedPlayers, 0, chosen, mask, k, minRound, maxRound, new int[]{minRound, maxRound});
        return new int[]{minRound, maxRound};
    }

    private void backtrack(List<List<Integer>> eliminatedPlayers, int idx, int[] chosen,
                           int mask, int k, int minRound, int maxRound, int[] result) {
        if (idx == eliminatedPlayers.size()) {
            int newMask = mask;
            for (int i = 0; i < eliminatedPlayers.size(); i++) {
                newMask ^= (1 << eliminatedPlayers.get(i).get(chosen[i]));
            }
            int[] next = dfs(k + 1, newMask);
            result[0] = Math.min(result[0], next[0]);
            result[1] = Math.max(result[1], next[1]);
            return;
        }

        for (int i = 0; i < eliminatedPlayers.get(idx).size(); i++) {
            chosen[idx] = i;
            backtrack(eliminatedPlayers, idx + 1, chosen, mask, k, minRound, maxRound, result);
        }
    }
}
