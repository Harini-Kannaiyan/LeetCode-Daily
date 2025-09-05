class Solution {
    makeTheIntegerZero(num1, num2) {
        for (let k = 1; ; k++) {
            let x = num1 - num2 * k;
            if (x < k) return -1;
            if (k >= x.toString(2).replace(/0/g, "").length) return k;
        }
    }
}
