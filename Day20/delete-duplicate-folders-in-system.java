class Trie {
    String serial = "";
    Map<String, Trie> children = new HashMap<>();
}

class Solution {
    Map<String, Integer> freq = new HashMap<>();
    List<List<String>> result = new ArrayList<>();

    public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {
        Trie root = new Trie();

        for (List<String> path : paths) {
            Trie curr = root;
            for (String folder : path) {
                curr.children.putIfAbsent(folder, new Trie());
                curr = curr.children.get(folder);
            }
        }

        construct(root);

        dfs(root, new ArrayList<>());
        return result;
    }

    private void construct(Trie node) {
        if (node.children.isEmpty()) return;

        List<String> v = new ArrayList<>();
        for (Map.Entry<String, Trie> entry : node.children.entrySet()) {
            construct(entry.getValue());
            v.add(entry.getKey() + "(" + entry.getValue().serial + ")");
        }
        Collections.sort(v);
        node.serial = String.join("", v);
        freq.put(node.serial, freq.getOrDefault(node.serial, 0) + 1);
    }

    private void dfs(Trie node, List<String> path) {
        if (freq.getOrDefault(node.serial, 0) > 1) return;
        if (!path.isEmpty()) result.add(new ArrayList<>(path));

        for (Map.Entry<String, Trie> entry : node.children.entrySet()) {
            path.add(entry.getKey());
            dfs(entry.getValue(), path);
            path.remove(path.size() - 1);
        }
    }
}
