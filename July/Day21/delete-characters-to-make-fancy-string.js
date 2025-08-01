// Time: O(N) :: Space: O(N)
var makeFancyString = function(s) {
    let result = '';
    let prev = '';
    let frequency = 0;

    for (let ch of s) {
        if (ch === prev) {
            frequency++;
        } else {
            prev = ch;
            frequency = 1;
        }

        if (frequency < 3) {
            result += ch;
        }
    }

    return result;
};


// Time: O(N) :: Space: O(1)
var makeFancyString = function(s) {
    if (s.length < 3) return s;
    const arr = s.split('');
    let j = 2;

    for (let i = 2; i < arr.length; i++) {
        if (!(arr[i] === arr[j - 1] && arr[i] === arr[j - 2])) {
            arr[j++] = arr[i];
        }
    }

    return arr.slice(0, j).join('');
};
