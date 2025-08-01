// Set + Prefix Check Approach  ::  Time: O(N * L^2)  ::  Space: O(N * L)
class Solution {
    public List<String> removeSubfolders(String[] folder) {
        Set<String> folderSet = new HashSet<>(Arrays.asList(folder));
        List<String> rootFolders = new ArrayList<>();

        for (String f : folderSet) {
            String prefix = f;
            boolean isSubFolder = false;

            while (!prefix.isEmpty()) {
                int pos = prefix.lastIndexOf("/");
                if (pos == -1) break;

                prefix = prefix.substring(0, pos);
                if (folderSet.contains(prefix)) {
                    isSubFolder = true;
                    break;
                }
            }

            if (!isSubFolder) rootFolders.add(f);
        }

        return rootFolders;
    }
}


// Sort + Linear Check Approach :: Time: O(N * L) Log(N) + O(N * L)   ::   Space: O(N * L)
class Solution {
    public List<String> removeSubfolders(String[] folder) {
        Arrays.sort(folder);
        List<String> rootFolders = new ArrayList<>();
        rootFolders.add(folder[0]);

        for (int i = 1; i < folder.length; i++) {
            String last = rootFolders.get(rootFolders.size() - 1) + "/";
            if (!folder[i].startsWith(last)) {
                rootFolders.add(folder[i]);
            }
        }

        return rootFolders;
    }
}



// Trie-Based Approach :: Time: O(N * L)  :: Space: O(N * L)
class Solution {
    class TrieNode {
        boolean isEnd = false;
        Map<String, TrieNode> children = new HashMap<>();
    }

    TrieNode root = new TrieNode();

    public List<String> removeSubfolders(String[] folder) {
        for (String path : folder) {
            TrieNode node = root;
            for (String part : path.split("/")) {
                if (part.isEmpty()) continue;
                node.children.putIfAbsent(part, new TrieNode());
                node = node.children.get(part);
            }
            node.isEnd = true;
        }

        List<String> res = new ArrayList<>();
        for (String path : folder) {
            TrieNode node = root;
            boolean isSubFolder = false;
            String[] parts = path.split("/");

            for (int i = 0; i < parts.length; i++) {
                if (parts[i].isEmpty()) continue;
                node = node.children.get(parts[i]);
                if (node.isEnd && i != parts.length - 1) {
                    isSubFolder = true;
                    break;
                }
            }

            if (!isSubFolder) res.add(path);
        }

        return res;
    }
}
