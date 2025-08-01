class Solution {
  possibleStringCount(word, k) {
    const MOD = 1e9 + 7;

    if (!word) return 0;

    let groups = [];
    let consecutiveCharactersCount = 1;

    for (let i = 1; i < word.length; i++) {
      if (word[i] === word[i - 1]) {
        consecutiveCharactersCount++;
      } else {
        groups.push(consecutiveCharactersCount);
        consecutiveCharactersCount = 1;
      }
    }
    groups.push(consecutiveCharactersCount);

    let totalPossibleCombinations = 1;
    for (const frequency of groups) {
      totalPossibleCombinations = (totalPossibleCombinations * frequency) % MOD;
    }

    if (k <= groups.length) return totalPossibleCombinations;

    let prev = Array(k).fill(0);
    prev[0] = 1;

    for (const count of groups) {
      let curr = Array(k).fill(0);
      let currSum = 0;
      for (let i = 0; i < k; i++) {
        if (i > 0) currSum = (currSum + prev[i - 1]) % MOD;
        if (i > count) currSum = (currSum - prev[i - count - 1] + MOD) % MOD;
        curr[i] = currSum;
      }
      prev = curr;
    }

    const invalidCombinations = prev.slice(groups.length).reduce((a, b) => (a + b) % MOD, 0);
    return (totalPossibleCombinations - invalidCombinations + MOD) % MOD;
  }
}
