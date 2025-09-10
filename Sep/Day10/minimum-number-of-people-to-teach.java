//  Time: O(M * N)  ::  Space: O(M + N)
import java.util.*;

class Solution {
    public int minimumTeachings(int n, int[][] languages, int[][] friendships) {
        Set<Integer> intersectionOfLang = new HashSet<>();

        for (int[] friendship : friendships) {
            int u = friendship[0] - 1, v = friendship[1] - 1;
            Set<Integer> langMap = new HashSet<>();
            for (int lang : languages[u]) {
                langMap.add(lang);
            }
            boolean isCommon = false;
            for (int lang : languages[v]) {
                if (langMap.contains(lang)) {
                    isCommon = true;
                    break;
                }
            }
            if (!isCommon) {
                intersectionOfLang.add(u);
                intersectionOfLang.add(v);
            }
        }

        int[] countOfPeopleKnownLang = new int[n + 1];
        int maxPeopleKnownLang = 0;

        for (int person : intersectionOfLang) {
            for (int lang : languages[person]) {
                countOfPeopleKnownLang[lang]++;
                maxPeopleKnownLang = Math.max(maxPeopleKnownLang, countOfPeopleKnownLang[lang]);
            }
        }

        return intersectionOfLang.size() - maxPeopleKnownLang;
    }
}
