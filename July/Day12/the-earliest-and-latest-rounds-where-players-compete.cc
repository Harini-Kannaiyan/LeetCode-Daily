#include <vector>
#include <deque>
#include <tuple>
#include <cmath>
#include <algorithm>

using namespace std;

class Solution {
public:
    int n, firstPlayer, secondPlayer;
    
    pair<int, int> dfs(int k, int mask) {
        deque<int> currentPlayers;
        for (int i = 0; i < n; ++i) {
            if (mask & (1 << i)) currentPlayers.push_back(i);
        }

        vector<vector<int>> eliminatedPlayers;
        while (currentPlayers.size() > 1) {
            int p1 = currentPlayers.front(); currentPlayers.pop_front();
            int p2 = currentPlayers.back(); currentPlayers.pop_back();

            if ((p1 == firstPlayer && p2 == secondPlayer) ||
                (p1 == secondPlayer && p2 == firstPlayer)) {
                return {k, k};
            }
            if (p1 == firstPlayer || p1 == secondPlayer) {
                eliminatedPlayers.push_back({p2});
            } else if (p2 == firstPlayer || p2 == secondPlayer) {
                eliminatedPlayers.push_back({p1});
            } else {
                eliminatedPlayers.push_back({p1, p2});
            }
        }

        int minRound = 1e9, maxRound = -1;
        int total = eliminatedPlayers.size();
        vector<int> chosen(total);

        function<void(int)> backtrack = [&](int i) {
            if (i == total) {
                int newMask = mask;
                for (int j = 0; j < total; ++j)
                    newMask ^= (1 << eliminatedPlayers[j][chosen[j]]);
                auto [a, b] = dfs(k + 1, newMask);
                minRound = min(minRound, a);
                maxRound = max(maxRound, b);
                return;
            }

            for (int j = 0; j < eliminatedPlayers[i].size(); ++j) {
                chosen[i] = j;
                backtrack(i + 1);
            }
        };

        backtrack(0);
        return {minRound, maxRound};
    }

    vector<int> earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        this->n = n;
        this->firstPlayer = firstPlayer - 1;
        this->secondPlayer = secondPlayer - 1;
        auto [a, b] = dfs(1, (1 << n) - 1);
        return {a, b};
    }
};
