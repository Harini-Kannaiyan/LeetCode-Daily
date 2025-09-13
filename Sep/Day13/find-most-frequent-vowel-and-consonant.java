// Both Approaches:  Time: O(N)  ::  Space: O(1)
class Solution {
    public int maxFreqSum1(String s) {
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char ch : s.toCharArray()) {
            freqMap.put(ch, freqMap.getOrDefault(ch, 0) + 1);
        }

        int vowelMaxFreq = 0, consonantMaxFreq = 0;
        Set<Character> vowels = new HashSet<>(Arrays.asList('a','e','i','o','u'));

        for (Map.Entry<Character, Integer> entry : freqMap.entrySet()) {
            char ch = entry.getKey();
            int count = entry.getValue();
            if (vowels.contains(ch)) {
                vowelMaxFreq = Math.max(vowelMaxFreq, count);
            } else {
                consonantMaxFreq = Math.max(consonantMaxFreq, count);
            }
        }
        return vowelMaxFreq + consonantMaxFreq;
    }

    // Version 2: iterate over string
    public int maxFreqSum2(String s) {
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char ch : s.toCharArray()) {
            freqMap.put(ch, freqMap.getOrDefault(ch, 0) + 1);
        }

        int vowelMaxFreq = 0, consonantMaxFreq = 0;
        Set<Character> vowels = new HashSet<>(Arrays.asList('a','e','i','o','u'));

        for (char ch : s.toCharArray()) {
            int count = freqMap.get(ch);
            if (vowels.contains(ch)) {
                vowelMaxFreq = Math.max(vowelMaxFreq, count);
            } else {
                consonantMaxFreq = Math.max(consonantMaxFreq, count);
            }
        }
        return vowelMaxFreq + consonantMaxFreq;
    }
}
