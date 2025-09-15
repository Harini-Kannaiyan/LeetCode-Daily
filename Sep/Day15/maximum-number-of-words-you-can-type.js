//  Time: O(N * B)  ::  Space:  O(1)
class Solution {
    canBeTypedWords(text, brokenLetters) {
        let count = 0;
        let words = text.split(" ");
        for (let word of words) {
            count++;
            for (let x of brokenLetters) {
                if (word.includes(x)) {
                    count--;
                    break;
                }
            }
        }
        return count;
    }
}




//  Time: O(N + B)  ::  Space:  O(1)
class Solution {
    canBeTypedWords(text, brokenLetters) {
        let broken = new Set(brokenLetters);
        let count = 0;
        for (let word of text.split(" ")) {
            let isBroken = false;
            for (let ch of word) {
                if (broken.has(ch)) {
                    isBroken = true;
                    break;
                }
            }
            if (!isBroken) count++;
        }
        return count;
    }
}




//  Time: O(N)  ::  Space:  O(1)
class Solution {
    canBeTypedWords(text, brokenLetters) {
        let brokenArr = Array(26).fill(0);
        for (let ch of brokenLetters) {
            brokenArr[ch.charCodeAt(0) - 97] = 1;
        }

        let wordIsBroken = false;
        let count = 1;
        for (let ch of text) {
            if (ch === ' ') {
                count++;
                wordIsBroken = false;
            } else {
                if (!wordIsBroken && brokenArr[ch.charCodeAt(0) - 97] === 1) {
                    wordIsBroken = true;
                    count--;
                }
            }
        }
        return count;
    }
}
