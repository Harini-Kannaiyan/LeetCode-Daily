# Time: O(N^2)  ::  Space: O(N) ==> For both approaches


class Solution:
    def calc(self, part1: int, part2: int, part3: int) -> int:
        return max(part1, part2, part3) - min(part1, part2, part3)

    def minimumScore(self, nums: List[int], edges: List[List[int]]) -> int:
        n = len(nums)
        cnt = 0
        sumXor = [0] * n
        tin = [0] * n
        tout = [0] * n
        adj = [[] for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(x: int, par: int):
            nonlocal cnt
            tin[x] = cnt
            cnt += 1
            sumXor[x] = nums[x]
            for y in adj[x]:
                if y == par:
                    continue
                dfs(y, x)
                sumXor[x] ^= sumXor[y]
            tout[x] = cnt

        dfs(0, -1)

        res = float("inf")
        for u in range(1, n):
            for v in range(u + 1, n):
                if tin[v] > tin[u] and tin[v] < tout[u]:
                    res = min(
                        res,
                        self.calc(
                            sumXor[0] ^ sumXor[u],
                            sumXor[u] ^ sumXor[v],
                            sumXor[v],
                        ),
                    )
                elif tin[u] > tin[v] and tin[u] < tout[v]:
                    res = min(
                        res,
                        self.calc(
                            sumXor[0] ^ sumXor[v],
                            sumXor[v] ^ sumXor[u],
                            sumXor[u],
                        ),
                    )
                else:
                    res = min(
                        res,
                        self.calc(
                            sumXor[0] ^ sumXor[u] ^ sumXor[v],
                            sumXor[u],
                            sumXor[v],
                        ),
                    )
        return res

class Solution:
    def calc(self, part1: int, part2: int, part3: int) -> int:
        return max(part1, part2, part3) - min(part1, part2, part3)

    def minimumScore(self, nums: List[int], edges: List[List[int]]) -> int:
        n = len(nums)
        adj = [[] for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        sumXor = 0
        for x in nums:
            sumXor ^= x

        res = float("inf")

        def dfs2(x: int, parent: int, firstXorVal: int, anc: int) -> int:
            secondXorVal = nums[x]
            for y in adj[x]:
                if y == parent:
                    continue
                secondXorVal ^= dfs2(y, x, firstXorVal, anc)
            if parent == anc:
                return secondXorVal
            nonlocal res
            res = min(res, self.calc(firstXorVal, secondXorVal, sumXor ^ firstXorVal ^ secondXorVal))
            return secondXorVal

        def dfs(x: int, parent: int) -> int:
            firstXorVal = nums[x]
            for y in adj[x]:
                if y == parent:
                    continue
                firstXorVal ^= dfs(y, x)
            for y in adj[x]:
                if y == parent:
                    dfs2(y, x, firstXorVal, x)
            return firstXorVal

        dfs(0, -1)
        return res
        