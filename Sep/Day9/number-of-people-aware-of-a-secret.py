#  Time: O(N)  ::  Space: O(N)
class Solution:
    def peopleAwareOfSecret(self, n: int, delay: int, forget: int) -> int:
        peopleKnowsSecret = [1] + [0] * (n - 1)
        mod = 10 ** 9 + 7
        knowsSecret = 0
        for i in range(1, n):
            peopleKnowsSecret[i] = knowsSecret = (knowsSecret + peopleKnowsSecret[i - delay] - peopleKnowsSecret[i - forget]) % mod
        return sum(peopleKnowsSecret[-forget:]) % mod