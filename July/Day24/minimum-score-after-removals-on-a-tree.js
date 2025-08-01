// Time: O(N^2)  ::  Space: O(N) ==> For both approaches

class Solution {
    calc(a, b, c) {
        return Math.max(a, b, c) - Math.min(a, b, c);
    }

    minimumScore(nums, edges) {
        const n = nums.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const tin = Array(n).fill(0), tout = Array(n).fill(0), sumXor = Array(n).fill(0);
        let timer = 0;

        const dfs = (x, par) => {
            tin[x] = timer++;
            sumXor[x] = nums[x];
            for (const y of adj[x]) {
                if (y === par) continue;
                dfs(y, x);
                sumXor[x] ^= sumXor[y];
            }
            tout[x] = timer;
        };

        dfs(0, -1);

        let res = Infinity;
        for (let u = 1; u < n; ++u) {
            for (let v = u + 1; v < n; ++v) {
                if (tin[v] > tin[u] && tin[v] < tout[u]) {
                    res = Math.min(res, this.calc(sumXor[0] ^ sumXor[u], sumXor[u] ^ sumXor[v], sumXor[v]));
                } else if (tin[u] > tin[v] && tin[u] < tout[v]) {
                    res = Math.min(res, this.calc(sumXor[0] ^ sumXor[v], sumXor[v] ^ sumXor[u], sumXor[u]));
                } else {
                    res = Math.min(res, this.calc(sumXor[0] ^ sumXor[u] ^ sumXor[v], sumXor[u], sumXor[v]));
                }
            }
        }

        return res;
    }
}





// Two-pass DFS Aproach
class Solution {
    constructor() {
        this.res = Infinity;
        this.sumXor = 0;
    }

    calc(a, b, c) {
        return Math.max(a, b, c) - Math.min(a, b, c);
    }

    dfs2(node, parent, firstXor, anc, nums, adj) {
        let secondXor = nums[node];
        for (const child of adj[node]) {
            if (child === parent) continue;
            secondXor ^= this.dfs2(child, node, firstXor, anc, nums, adj);
        }
        if (parent !== anc) {
            this.res = Math.min(this.res, this.calc(firstXor, secondXor, this.sumXor ^ firstXor ^ secondXor));
        }
        return secondXor;
    }

    dfs(node, parent, nums, adj) {
        let firstXor = nums[node];
        for (const child of adj[node]) {
            if (child === parent) continue;
            firstXor ^= this.dfs(child, node, nums, adj);
        }
        for (const child of adj[node]) {
            if (child !== parent) {
                this.dfs2(child, node, firstXor, node, nums, adj);
            }
        }
        return firstXor;
    }

    minimumScore(nums, edges) {
        const n = nums.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        this.sumXor = nums.reduce((acc, val) => acc ^ val, 0);
        this.res = Infinity;
        this.dfs(0, -1, nums, adj);
        return this.res;
    }
}
