class Solution {
    public char kthCharacter(int k) {
        StringBuilder prevString = new StringBuilder("a");
        while (prevString.length() < k) {
            StringBuilder currString = new StringBuilder();
            for (int i = 0; i < prevString.length(); i++) {
                char ch = prevString.charAt(i);
                char nextChar = (char) ('a' + ((ch - 'a' + 1) % 26));
                currString.append(nextChar);
            }
            prevString.append(currString);
        }
        return prevString.charAt(k - 1);
    }
}



// Logarithmic approach

class Solution {
    public char kthCharacter(int k) {
        int ans = 0;
        while (k != 1) {
            int power = 31 - Integer.numberOfLeadingZeros(k); // bit_length - 1
            if ((1 << power) == k) power--;
            k -= 1 << power;
            ans++;
        }
        return (char) ('a' + ans);
    }
}



// Bit Count (O(1))

class Solution {
    public char kthCharacter(int k) {
        int bitCount = Integer.bitCount(k - 1);
        return (char) ('a' + bitCount);
    }
}

