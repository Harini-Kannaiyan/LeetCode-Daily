// Time: O(N * LogW)  ::  Space: O(N)

var subarrayBitwiseORs = function(arr) {
    let ans = new Set();
    let cur = new Set([0]);
    for (let x of arr) {
        let temp = new Set();
        temp.add(x);
        for (let y of cur) {
            temp.add(x | y);
        }
        cur = temp;
        for (let val of cur) {
            ans.add(val);
        }
    }
    return ans.size;
};
