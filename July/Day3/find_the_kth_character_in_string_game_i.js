class Solution {
    kthCharacter(k) {
        let prevString = 'a';
        while (prevString.length < k) {
            let currString = '';
            for (let ch of prevString) {
                let nextChar = String.fromCharCode(((ch.charCodeAt(0) - 97 + 1) % 26) + 97);
                currString += nextChar;
            }
            prevString += currString;
        }
        return prevString[k - 1];
    }
}


// Logarithmic approach

class Solution {
    kthCharacter(k) {
        let ans = 0;
        while (k !== 1) {
            let power = Math.floor(Math.log2(k));
            if ((1 << power) === k) power -= 1;
            k -= 1 << power;
            ans++;
        }
        return String.fromCharCode('a'.charCodeAt(0) + ans);
    }
}


// Bit Count (O(1))
class Solution {
    kthCharacter(k) {
        const bitCount = (k - 1).toString(2).split('1').length - 1;
        return String.fromCharCode('a'.charCodeAt(0) + bitCount);
    }
}
