//  Time: O(M * N)  ::  Space: O(M + N)
class Solution {
public:
    int minimumTeachings(int n, vector<vector<int>>& languages, vector<vector<int>>& friendships) {
        unordered_set<int> intersectionOfLang;

        for (auto& friendship : friendships) {
            int u = friendship[0] - 1, v = friendship[1] - 1;
            unordered_set<int> langMap(languages[u].begin(), languages[u].end());
            bool isCommon = false;
            for (int lang : languages[v]) {
                if (langMap.count(lang)) {
                    isCommon = true;
                    break;
                }
            }
            if (!isCommon) {
                intersectionOfLang.insert(u);
                intersectionOfLang.insert(v);
            }
        }

        vector<int> countOfPeopleKnownLang(n + 1, 0);
        int maxPeopleKnownLang = 0;

        for (int person : intersectionOfLang) {
            for (int lang : languages[person]) {
                countOfPeopleKnownLang[lang]++;
                maxPeopleKnownLang = max(maxPeopleKnownLang, countOfPeopleKnownLang[lang]);
            }
        }

        return (int)intersectionOfLang.size() - maxPeopleKnownLang;
    }
};
