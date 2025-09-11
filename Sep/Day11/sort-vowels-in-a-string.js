//  Time: O(N * LogN)  ::  Space: O(N)

class Solution {
    isVowel(c) {
        return "aeiouAEIOU".includes(c);
    }

    sortVowels(s) {
        let arr = s.split("");
        let key = arr.filter(c => this.isVowel(c));
        key.sort();

        let j = 0;
        for (let i = 0; i < arr.length; i++) {
            if (this.isVowel(arr[i])) {
                arr[i] = key[j++];
            }
        }
        return arr.join("");
    }
}


//  Time: O(N)  :: Space: O(1)
class Solution2 {
    isVowel(c) {
        return "aeiouAEIOU".includes(c);
    }

    sortVowels(s) {
        let count = {};
        for (let c of s) {
            if (this.isVowel(c)) count[c] = (count[c] || 0) + 1;
        }

        let sortedVowel = "AEIOUaeiou";
        let ans = [];
        let j = 0;

        for (let c of s) {
            if (!this.isVowel(c)) {
                ans.push(c);
            } else {
                while (j < sortedVowel.length && (!count[sortedVowel[j]] || count[sortedVowel[j]] === 0)) {
                    j++;
                }
                ans.push(sortedVowel[j]);
                count[sortedVowel[j]]--;
            }
        }
        return ans.join("");
    }
}
