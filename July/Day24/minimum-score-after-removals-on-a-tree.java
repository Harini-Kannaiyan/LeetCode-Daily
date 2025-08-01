// Time: O(N^2)  ::  Space: O(N) ==> For both approaches


class Solution {
    int[] tin, tout, sumXor;
    int timer = 0;

    int calc(int a, int b, int c) {
        return Math.max(a, Math.max(b, c)) - Math.min(a, Math.min(b, c));
    }

    public int minimumScore(int[] nums, int[][] edges) {
        int n = nums.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; ++i) adj[i] = new ArrayList<>();
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        tin = new int[n];
        tout = new int[n];
        sumXor = new int[n];

        dfs(0, -1, nums, adj);

        int res = Integer.MAX_VALUE;
        for (int u = 1; u < n; ++u) {
            for (int v = u + 1; v < n; ++v) {
                if (tin[v] > tin[u] && tin[v] < tout[u]) {
                    res = Math.min(res, calc(sumXor[0] ^ sumXor[u], sumXor[u] ^ sumXor[v], sumXor[v]));
                } else if (tin[u] > tin[v] && tin[u] < tout[v]) {
                    res = Math.min(res, calc(sumXor[0] ^ sumXor[v], sumXor[v] ^ sumXor[u], sumXor[u]));
                } else {
                    res = Math.min(res, calc(sumXor[0] ^ sumXor[u] ^ sumXor[v], sumXor[u], sumXor[v]));
                }
            }
        }

        return res;
    }

    void dfs(int node, int parent, int[] nums, List<Integer>[] adj) {
        tin[node] = timer++;
        sumXor[node] = nums[node];
        for (int child : adj[node]) {
            if (child != parent) {
                dfs(child, node, nums, adj);
                sumXor[node] ^= sumXor[child];
            }
        }
        tout[node] = timer;
    }
}




// Two-pass DFS Aproach
class Solution {
    int res = Integer.MAX_VALUE, sumXor = 0;

    int calc(int a, int b, int c) {
        return Math.max(a, Math.max(b, c)) - Math.min(a, Math.min(b, c));
    }

    int dfs2(int node, int parent, int firstXor, int anc, int[] nums, List<Integer>[] adj) {
        int secondXor = nums[node];
        for (int child : adj[node]) {
            if (child == parent) continue;
            secondXor ^= dfs2(child, node, firstXor, anc, nums, adj);
        }
        if (parent != anc) {
            res = Math.min(res, calc(firstXor, secondXor, sumXor ^ firstXor ^ secondXor));
        }
        return secondXor;
    }

    int dfs(int node, int parent, int[] nums, List<Integer>[] adj) {
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

    public int minimumScore(int[] nums, int[][] edges) {
        int n = nums.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; ++i) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            adj[e[0]].add(e[1]);
            adj[e[1]].add(e[0]);
        }

        for (int num : nums) sumXor ^= num;

        dfs(0, -1, nums, adj);
        return res;
    }
}
