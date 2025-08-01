function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

//  Time: O(N) | Space: O(N)
var getDecimalValue = function(head) {
    const values = [];
    while (head !== null) {
        values.push(head.val);
        head = head.next;
    }

    let currVal = 0;
    for (let val of values) {
        currVal = 2 * currVal + val;
    }
    return currVal;
};

//  Time: O(N) | Space: O(1)
var getDecimalValue = function(head) {
    let currVal = 0;
    while (head !== null) {
        currVal = 2 * currVal + head.val;
        head = head.next;
    }
    return currVal;
};