class Solution {
    // Time: O(N) :: Space: O(N)
    public String makeFancyString(String s) {
        StringBuilder newStr = new StringBuilder();
        char prev = 0;
        int frequency = 0;

        for (char ch : s.toCharArray()) {
            if (ch == prev) {
                frequency++;
            } else {
                prev = ch;
                frequency = 1;
            }

            if (frequency < 3) {
                newStr.append(ch);
            }
        }

        return newStr.toString();
    }
}


class Solution {
    // Time: O(N) :: Space: O(1)
    public String makeFancyString(String s) {
        if (s.length() < 3) return s;
        char[] chars = s.toCharArray();
        int j = 2;

        for (int i = 2; i < chars.length; ++i) {
            if (!(chars[i] == chars[j - 1] && chars[i] == chars[j - 2])) {
                chars[j++] = chars[i];
            }
        }

        return new String(chars, 0, j);
    }
}
