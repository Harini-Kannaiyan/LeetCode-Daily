class Solution {
    removeVowel(word) {
        return word.replace(/[aeiou]/g, '*');
    }

    spellchecker(wordlist, queries) {
        const exactWords = new Set(wordlist);
        const lowerCaseConvertedWords = new Map();
        const vowelRemovedWords = new Map();

        for (let word of wordlist) {
            const lowerCaseWord = word.toLowerCase();
            if (!lowerCaseConvertedWords.has(lowerCaseWord)) {
                lowerCaseConvertedWords.set(lowerCaseWord, word);
            }
            const vowelRemoved = this.removeVowel(lowerCaseWord);
            if (!vowelRemovedWords.has(vowelRemoved)) {
                vowelRemovedWords.set(vowelRemoved, word);
            }
        }

        return queries.map(query => {
            if (exactWords.has(query)) return query;

            const lowerCaseQuery = query.toLowerCase();
            if (lowerCaseConvertedWords.has(lowerCaseQuery)) {
                return lowerCaseConvertedWords.get(lowerCaseQuery);
            }

            const vowelRemovedQuery = this.removeVowel(lowerCaseQuery);
            if (vowelRemovedWords.has(vowelRemovedQuery)) {
                return vowelRemovedWords.get(vowelRemovedQuery);
            }

            return "";
        });
    }
}
