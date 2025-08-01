
class Solution {
    // Time: O(N) | Space: O(1)
    isValid(word) {
        if (word.length < 3) return false;

        let foundVowel = false, foundConsonant = false;

        for (let ch of word) {
            if (/[a-zA-Z]/.test(ch)) {
                let lower = ch.toLowerCase();
                if ("aeiou".includes(lower)) {
                    foundVowel = true;
                } else {
                    foundConsonant = true;
                }
            } else if (!/[0-9]/.test(ch)) {
                return false;
            }
        }
        return foundVowel && foundConsonant;
    }
}



class Solution {
    // Time: O(N) | Space: O(1)
    isValid(word) {
        if (word.length < 3) return false;

        const digits = ['0','1','2','3','4','5','6','7','8','9'];
        const vowels = ['A','a','E','e','I','i','O','o','U','u'];
        const symbols = ['@', '#', '$'];

        let foundVowel = false, foundConsonant = false;

        for (let ch of word) {
            if (symbols.includes(ch)) return false;
            if (vowels.includes(ch)) {
                foundVowel = true;
            } else if (!digits.includes(ch)) {
                foundConsonant = true;
            }
        }

        return foundVowel && foundConsonant;
    }
}
