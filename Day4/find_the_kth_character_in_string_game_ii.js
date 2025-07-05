function kthCharacter(k, operations) {
    let prevString = "a";
    let i = 0;

    while (prevString.length < k) {
        let currString = "";
        if (operations[i]) {
            for (let ch of prevString) {
                let nextChar = String.fromCharCode(
                    'a'.charCodeAt(0) + ((ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1) % 26)
                );
                currString += nextChar;
            }
        } else {
            currString = prevString;
        }
        prevString += currString;
        i++;
    }

    return prevString[k - 1];
}
