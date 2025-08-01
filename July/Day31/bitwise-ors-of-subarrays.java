// Time: O(N * LogW)  ::  Space: O(N)

import java.util.*;

class Solution {
    public int subarrayBitwiseORs(int[] arr) {
        Set<Integer> ans = new HashSet<>();
        Set<Integer> cur = new HashSet<>();
        cur.add(0);
        for (int x : arr) {
            Set<Integer> temp = new HashSet<>();
            temp.add(x);
            for (int y : cur) {
                temp.add(x | y);
            }
            cur = temp;
            ans.addAll(cur);
        }
        return ans.size();
    }
}
