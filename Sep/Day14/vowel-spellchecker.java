import java.util.*;

class Solution {
    private String removeVowel(String word) {
        StringBuilder sb = new StringBuilder();
        for (char c : word.toCharArray()) {
            if ("aeiou".indexOf(c) != -1) {
                sb.append('*');
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    public String[] spellchecker(String[] wordlist, String[] queries) {
        Set<String> exactWords = new HashSet<>(Arrays.asList(wordlist));
        Map<String, String> lowerCaseConvertedWords = new HashMap<>();
        Map<String, String> vowelRemovedWords = new HashMap<>();

        for (String word : wordlist) {
            String lowerCaseWord = word.toLowerCase();
            lowerCaseConvertedWords.putIfAbsent(lowerCaseWord, word);
            vowelRemovedWords.putIfAbsent(removeVowel(lowerCaseWord), word);
        }

        String[] result = new String[queries.length];
        for (int i = 0; i < queries.length; i++) {
            String query = queries[i];
            if (exactWords.contains(query)) {
                result[i] = query;
                continue;
            }

            String lowerCaseQuery = query.toLowerCase();
            if (lowerCaseConvertedWords.containsKey(lowerCaseQuery)) {
                result[i] = lowerCaseConvertedWords.get(lowerCaseQuery);
                continue;
            }

            String vowelRemovedQuery = removeVowel(lowerCaseQuery);
            if (vowelRemovedWords.containsKey(vowelRemovedQuery)) {
                result[i] = vowelRemovedWords.get(vowelRemovedQuery);
                continue;
            }

            result[i] = "";
        }
        return result;
    }
}
