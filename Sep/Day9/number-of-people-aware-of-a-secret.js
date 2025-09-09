//  Time: O(N)  ::  Space: O(N)
var peopleAwareOfSecret = function(n, delay, forget) {
    const mod = 1e9 + 7;
    const peopleKnowsSecret = new Array(n).fill(0);
    peopleKnowsSecret[0] = 1;
    let knowsSecret = 0;

    for (let i = 1; i < n; i++) {
        knowsSecret = (knowsSecret 
                      + (i - delay >= 0 ? peopleKnowsSecret[i - delay] : 0) 
                      - (i - forget >= 0 ? peopleKnowsSecret[i - forget] : 0) 
                      + mod) % mod;
        peopleKnowsSecret[i] = knowsSecret;
    }

    let result = 0;
    for (let i = n - forget; i < n; i++) {
        if (i >= 0) result = (result + peopleKnowsSecret[i]) % mod;
    }
    return result;
};
