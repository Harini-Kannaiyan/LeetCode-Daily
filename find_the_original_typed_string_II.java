import java.util.*;

class Solution {
    public int possibleStringCount(String word, int k) {
        final int MOD = 1_000_000_007;

        if (word == null || word.length() == 0) return 0;

        List<Integer> groups = new ArrayList<>();
        int consecutiveCharactersCount = 1;

        for (int i = 1; i < word.length(); i++) {
            if (word.charAt(i) == word.charAt(i - 1)) {
                consecutiveCharactersCount++;
            } else {
                groups.add(consecutiveCharactersCount);
                consecutiveCharactersCount = 1;
            }
        }
        groups.add(consecutiveCharactersCount);

        long totalPossibleCombinations = 1;
        for (int frequency : groups) {
            totalPossibleCombinations = (totalPossibleCombinations * frequency) % MOD;
        }

        if (k <= groups.size()) return (int) totalPossibleCombinations;

        int[] prev = new int[k];
        prev[0] = 1;

        for (int count : groups) {
            int[] curr = new int[k];
            long currSum = 0;
            for (int i = 0; i < k; i++) {
                if (i > 0) currSum = (currSum + prev[i - 1]) % MOD;
                if (i > count) currSum = (currSum - prev[i - count - 1] + MOD) % MOD;
                curr[i] = (int) currSum;
            }
            prev = curr;
        }

        long invalidCombinations = 0;
        for (int i = groups.size(); i < k; i++) {
            invalidCombinations = (invalidCombinations + prev[i]) % MOD;
        }

        return (int) ((totalPossibleCombinations - invalidCombinations + MOD) % MOD);
    }
}
