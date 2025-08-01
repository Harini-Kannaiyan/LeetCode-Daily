class Solution {
public:
    char kthCharacter(int k) {
        std::string prevString = "a";
        while (prevString.length() < k) {
            std::string currString = "";
            for (char ch : prevString) {
                char nextChar = 'a' + ((ch - 'a' + 1) % 26);
                currString += nextChar;
            }
            prevString += currString;
        }
        return prevString[k - 1];
    }
};


// Logarithmic approach: O(log(k))

class Solution {
public:
    char kthCharacter(int k) {
        int ans = 0;
        while (k != 1) {
            int power = 31 - __builtin_clz(k); // bit_length - 1
            if ((1 << power) == k) power--;
            k -= 1 << power;
            ans++;
        }
        return 'a' + ans;
    }
};


// Bit Count (O(1))
class Solution {
public:
    char kthCharacter(int k) {
        int bitCount = __builtin_popcount(k - 1);
        return 'a' + bitCount;
    }
};


