//  Time: O(N * B)  ::  Space:  O(1)
class Solution {
    public int canBeTypedWords(String text, String brokenLetters) {
        int count = 0;
        String[] words = text.split(" ");
        for (String word : words) {
            count++;
            for (char x : brokenLetters.toCharArray()) {
                if (word.indexOf(x) != -1) {
                    count--;
                    break;
                }
            }
        }
        return count;
    }
}



//  Time: O(N + B)  ::  Space:  O(1)
class Solution {
    public int canBeTypedWords(String text, String brokenLetters) {
        Set<Character> broken = new HashSet<>();
        for (char ch : brokenLetters.toCharArray()) {
            broken.add(ch);
        }
        int count = 0;
        for (String word : text.split(" ")) {
            boolean isBroken = false;
            for (char ch : word.toCharArray()) {
                if (broken.contains(ch)) {
                    isBroken = true;
                    break;
                }
            }
            if (!isBroken) count++;
        }
        return count;
    }
}



//  Time: O(N)  ::  Space:  O(1)
class Solution {
    public int canBeTypedWords(String text, String brokenLetters) {
        int[] brokenArr = new int[26];
        for (char ch : brokenLetters.toCharArray()) {
            brokenArr[ch - 'a'] = 1;
        }
        
        boolean wordIsBroken = false;
        int count = 1;
        for (char ch : text.toCharArray()) {
            if (ch == ' ') {
                count++;
                wordIsBroken = false;
            } else {
                if (!wordIsBroken && brokenArr[ch - 'a'] == 1) {
                    wordIsBroken = true;
                    count--;
                }
            }
        }
        return count;
    }
}
