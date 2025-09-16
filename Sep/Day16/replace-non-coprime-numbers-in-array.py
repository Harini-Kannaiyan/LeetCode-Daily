class Solution:
    def replaceNonCoprimes(self, nums: List[int]) -> List[int]:
        stack = []

        for num in nums:
            while stack:
                gcd = math.gcd(stack[-1], num)
                if gcd == 1:
                    break
                num = (stack.pop() * num) // gcd # LCM = (num1 * num2) // gcd
            stack.append(num)

        return stack