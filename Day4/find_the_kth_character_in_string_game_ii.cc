class Solution {
public:
    char kthCharacter(int k, const std::vector<int>& operations) {
        std::string prevString = "a";
        int i = 0;
        
        while (prevString.length() < k) {
            std::string currString = "";
            if (operations[i]) {
                for (char ch : prevString) {
                    char nextChar = 'a' + ((ch - 'a' + 1) % 26);
                    currString += nextChar;
                }
            } else {
                currString = prevString;
            }
            prevString += currString;
            i++;
        }
        return prevString[k - 1];
    }
};
