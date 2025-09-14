class Solution:
    def spellchecker(self, wordlist: List[str], queries: List[str]) -> List[str]:
        def removeVowel(word):
            return "".join('*' if c in 'aeiou' else c for c in word)
        
        exactWords = set(wordlist)
        lowerCaseConvertedWords = {}
        vowelRemovedWords = {}
        
        for word in wordlist:
            lowerCaseWord = word.lower()
            lowerCaseConvertedWords.setdefault(lowerCaseWord, word)
            vowelRemovedWords.setdefault(removeVowel(lowerCaseWord), word)

        def findWords(query):
            if query in exactWords:
                return query
            
            lowerCaseQuery = query.lower()
            if lowerCaseQuery in lowerCaseConvertedWords:
                return lowerCaseConvertedWords[lowerCaseQuery]
            
            vowelRemovedQuery = removeVowel(lowerCaseQuery)
            if vowelRemovedQuery in vowelRemovedWords:
                return vowelRemovedWords[vowelRemovedQuery]
            
            return ""
        
        return list(map(findWords, queries))
            
        