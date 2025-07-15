public class Solution {
    // Time: O(N) | Space: O(1)
    public boolean isValid(String word) {
        if (word.length() < 3) return false;

        boolean foundVowel = false, foundConsonant = false;

        for (char ch : word.toCharArray()) {
            if (Character.isLetter(ch)) {
                char lower = Character.toLowerCase(ch);
                if ("aeiou".indexOf(lower) != -1)
                    foundVowel = true;
                else
                    foundConsonant = true;
            } else if (!Character.isDigit(ch)) {
                return false;
            }
        }
        return foundVowel && foundConsonant;
    }
}


public class Solution {
    // Time: O(N) | Space: O(1)
    public boolean isValid(String word) {
        if (word.length() < 3) return false;

        char[] digits = {'0','1','2','3','4','5','6','7','8','9'};
        char[] vowels = {'A','a','E','e','I','i','O','o','U','u'};
        char[] symbols = {'@', '#', '$'};

        boolean foundVowel = false, foundConsonant = false;

        for (char ch : word.toCharArray()) {
            if (contains(symbols, ch)) return false;
            if (contains(vowels, ch)) {
                foundVowel = true;
            } else if (!contains(digits, ch)) {
                foundConsonant = true;
            }
        }

        return foundVowel && foundConsonant;
    }

    private boolean contains(char[] arr, char target) {
        for (char c : arr) {
            if (c == target) return true;
        }
        return false;
    }
}
