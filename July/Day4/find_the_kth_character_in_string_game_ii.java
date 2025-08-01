import java.util.*;

class Solution {
    public char kthCharacter(int k, List<Integer> operations) {
        StringBuilder prevString = new StringBuilder("a");
        int i = 0;

        while (prevString.length() < k) {
            StringBuilder currString = new StringBuilder();
            if (operations.get(i) == 1) {
                for (int j = 0; j < prevString.length(); j++) {
                    char ch = prevString.charAt(j);
                    char nextChar = (char) ('a' + ((ch - 'a' + 1) % 26));
                    currString.append(nextChar);
                }
            } else {
                currString.append(prevString);
            }
            prevString.append(currString);
            i++;
        }
        return prevString.charAt(k - 1);
    }
}
