class Solution {
    // Time: O(N)  ::  Space: O(N)
    maximumGain(s, x, y) {
        const removeSubString = (word, target) => {
            const stack = [];
            let totalRemoved = 0;

            for (const ch of word) {
                if (stack.length > 0 && ch === target[1] && stack[stack.length - 1] === target[0]) {
                    stack.pop();
                    totalRemoved += 2;
                } else {
                    stack.push(ch);
                }
            }
            return [stack.join(""), totalRemoved];
        };

        let maxScore = 0;
        const firstPair = x > y ? "ab" : "ba";
        const secondPair = x > y ? "ba" : "ab";

        const [str1, count1] = removeSubString(s, firstPair);
        maxScore += Math.floor(count1 / 2) * Math.max(x, y);

        const [str2, count2] = removeSubString(str1, secondPair);
        maxScore += Math.floor(count2 / 2) * Math.min(x, y);

        return maxScore;
    }
}




class Solution {
    // Time: O(N)  ::  Space: O(1)
    removeSubString(arr, target) {
        let write = 0, count = 0;
        for (let read = 0; read < arr.length; read++) {
            arr[write++] = arr[read];
            if (write > 1 && arr[write - 2] === target[0] && arr[write - 1] === target[1]) {
                write -= 2;
                count++;
            }
        }
        arr.length = write;
        return count;
    }

    maximumGain(s, x, y) {
        const arr = [...s];
        let maxScore = 0;
        if (x > y) {
            maxScore += x * this.removeSubString(arr, "ab");
            maxScore += y * this.removeSubString(arr, "ba");
        } else {
            maxScore += y * this.removeSubString(arr, "ba");
            maxScore += x * this.removeSubString(arr, "ab");
        }
        return maxScore;
    }
}

