//  Time: O(M * N)  ::  Space: O(M + N)
class Solution {
    minimumTeachings(n, languages, friendships) {
        let intersectionOfLang = new Set();

        for (let [u, v] of friendships) {
            u -= 1;
            v -= 1;
            let langMap = new Set(languages[u]);
            let isCommon = false;
            for (let lang of languages[v]) {
                if (langMap.has(lang)) {
                    isCommon = true;
                    break;
                }
            }
            if (!isCommon) {
                intersectionOfLang.add(u);
                intersectionOfLang.add(v);
            }
        }

        let countOfPeopleKnownLang = new Array(n + 1).fill(0);
        let maxPeopleKnownLang = 0;

        for (let person of intersectionOfLang) {
            for (let lang of languages[person]) {
                countOfPeopleKnownLang[lang]++;
                maxPeopleKnownLang = Math.max(maxPeopleKnownLang, countOfPeopleKnownLang[lang]);
            }
        }

        return intersectionOfLang.size - maxPeopleKnownLang;
    }
}
