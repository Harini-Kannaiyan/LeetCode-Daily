class Solution {
    replaceNonCoprimes(nums) {
        const stack = [];
        for (let num of nums) {
            while (stack.length > 0) {
                const g = this.gcd(stack[stack.length - 1], num);
                if (g === 1) break;
                num = Math.floor((stack.pop() * num) / g); // LCM = (a * b) / gcd
            }
            stack.push(num);
        }
        return stack;
    }

    gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
