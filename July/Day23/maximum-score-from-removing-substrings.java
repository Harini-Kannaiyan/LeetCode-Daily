class Solution {
    // Time: O(N)  ::  Space: O(N)
    public int maximumGain(String s, int x, int y) {
        class Result {
            String str;
            int count;
            Result(String str, int count) {
                this.str = str;
                this.count = count;
            }
        }

        Result removeSubString(String word, String target) {
            StringBuilder stack = new StringBuilder();
            int totalRemoved = 0;
            for (char ch : word.toCharArray()) {
                int len = stack.length();
                if (len > 0 && ch == target.charAt(1) && stack.charAt(len - 1) == target.charAt(0)) {
                    stack.deleteCharAt(len - 1);
                    totalRemoved += 2;
                } else {
                    stack.append(ch);
                }
            }
            return new Result(stack.toString(), totalRemoved);
        }

        int maxScore = 0;
        String firstPair = x > y ? "ab" : "ba";
        String secondPair = x > y ? "ba" : "ab";

        Result res1 = removeSubString(s, firstPair);
        maxScore += (res1.count / 2) * Math.max(x, y);

        Result res2 = removeSubString(res1.str, secondPair);
        maxScore += (res2.count / 2) * Math.min(x, y);

        return maxScore;
    }
}






class Solution {
    // Time: O(N)  ::  Space: O(1)
    private int removeSubString(List<Character> s, String target) {
        int write = 0, count = 0;
        for (int read = 0; read < s.size(); read++) {
            s.set(write++, s.get(read));
            if (write > 1 && s.get(write - 2) == target.charAt(0) && s.get(write - 1) == target.charAt(1)) {
                write -= 2;
                count++;
            }
        }
        while (s.size() > write) s.remove(s.size() - 1);
        return count;
    }

    public int maximumGain(String s, int x, int y) {
        List<Character> chars = new ArrayList<>();
        for (char c : s.toCharArray()) chars.add(c);
        int maxScore = 0;
        if (x > y) {
            maxScore += x * removeSubString(chars, "ab");
            maxScore += y * removeSubString(chars, "ba");
        } else {
            maxScore += y * removeSubString(chars, "ba");
            maxScore += x * removeSubString(chars, "ab");
        }
        return maxScore;
    }
}
