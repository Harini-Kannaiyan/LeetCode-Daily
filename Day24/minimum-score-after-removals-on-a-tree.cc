// Time: O(N^2)  ::  Space: O(N) ==> For both approaches

class Solution {
public:
    int calc(int a, int b, int c) {
        return max({a, b, c}) - min({a, b, c});
    }

    int minimumScore(vector<int>& nums, vector<vector<int>>& edges) {
        int n = nums.size();
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<int> sumXor(n), tin(n), tout(n);
        int timer = 0;

        function<void(int, int)> dfs = [&](int node, int parent) {
            tin[node] = timer++;
            sumXor[node] = nums[node];
            for (int child : adj[node]) {
                if (child == parent) continue;
                dfs(child, node);
                sumXor[node] ^= sumXor[child];
            }
            tout[node] = timer;
        };

        dfs(0, -1);

        int res = INT_MAX;
        for (int u = 1; u < n; ++u) {
            for (int v = u + 1; v < n; ++v) {
                if (tin[v] > tin[u] && tin[v] < tout[u]) {
                    res = min(res, calc(sumXor[0] ^ sumXor[u], sumXor[u] ^ sumXor[v], sumXor[v]));
                } else if (tin[u] > tin[v] && tin[u] < tout[v]) {
                    res = min(res, calc(sumXor[0] ^ sumXor[v], sumXor[v] ^ sumXor[u], sumXor[u]));
                } else {
                    res = min(res, calc(sumXor[0] ^ sumXor[u] ^ sumXor[v], sumXor[u], sumXor[v]));
                }
            }
        }

        return res;
    }
};



// Two-pass DFS Aproach
class Solution {
public:
    int res = INT_MAX, sumXor = 0;

    int calc(int a, int b, int c) {
        return max({a, b, c}) - min({a, b, c});
    }

    int dfs2(int node, int parent, int firstXor, int anc, vector<int>& nums, vector<vector<int>>& adj) {
        int secondXor = nums[node];
        for (int child : adj[node]) {
            if (child == parent) continue;
            secondXor ^= dfs2(child, node, firstXor, anc, nums, adj);
        }
        if (parent != anc) {
            res = min(res, calc(firstXor, secondXor, sumXor ^ firstXor ^ secondXor));
        }
        return secondXor;
    }

    int dfs(int node, int parent, vector<int>& nums, vector<vector<int>>& adj) {
        int firstXor = nums[node];
        for (int child : adj[node]) {
            if (child == parent) continue;
            firstXor ^= dfs(child, node, nums, adj);
        }
        for (int child : adj[node]) {
            if (child != parent) {
                dfs2(child, node, firstXor, node, nums, adj);
            }
        }
        return firstXor;
    }
