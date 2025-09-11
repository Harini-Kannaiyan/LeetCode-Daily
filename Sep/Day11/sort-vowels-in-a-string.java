//  Time: O(N * LogN)  ::  Space: O(N)
import java.util.*;

class Solution {
    private boolean isVowel(char c) {
        return "aeiouAEIOU".indexOf(c) != -1;
    }

    public String sortVowels(String s) {
        List<Character> key = new ArrayList<>();
        char[] arr = s.toCharArray();

        for (char c : arr) {
            if (isVowel(c)) key.add(c);
        }

        Collections.sort(key);

        int j = 0;
        for (int i = 0; i < arr.length; i++) {
            if (isVowel(arr[i])) {
                arr[i] = key.get(j++);
            }
        }
        return new String(arr);
    }
}


//  Time: O(N)  :: Space: O(1)
class Solution2 {
    private boolean isVowel(char c) {
        return "aeiouAEIOU".indexOf(c) != -1;
    }
    public String sortVowels(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            if (isVowel(c)) count.put(c, count.getOrDefault(c, 0) + 1);
        }

        String sortedVowel = "AEIOUaeiou";
        StringBuilder ans = new StringBuilder();
        int j = 0;

        for (char c : s.toCharArray()) {
            if (!isVowel(c)) {
                ans.append(c);
            } else {
                while (j < sortedVowel.length() && count.getOrDefault(sortedVowel.charAt(j), 0) == 0) {
                    j++;
                }
                ans.append(sortedVowel.charAt(j));
                count.put(sortedVowel.charAt(j), count.get(sortedVowel.charAt(j)) - 1);
            }
        }
        return ans.toString();
    }
}
