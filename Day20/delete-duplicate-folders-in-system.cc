class Trie {
public:
    string serial;
    unordered_map<string, Trie*> children;

    Trie() : serial("") {}
};

class Solution {
public:
    vector<vector<string>> deleteDuplicateFolder(vector<vector<string>>& paths) {
        Trie* root = new Trie();

        for (auto& path : paths) {
            Trie* curr = root;
            for (auto& folder : path) {
                if (!curr->children.count(folder)) {
                    curr->children[folder] = new Trie();
                }
                curr = curr->children[folder];
            }
        }

        unordered_map<string, int> freq;

        function<void(Trie*)> construct = [&](Trie* node) {
            if (node->children.empty()) return;

            vector<string> v;
            for (auto& [folder, child] : node->children) {
                construct(child);
                v.push_back(folder + "(" + child->serial + ")");
            }
            sort(v.begin(), v.end());
            node->serial = accumulate(v.begin(), v.end(), string(""));
            freq[node->serial]++;
        };

        construct(root);

        vector<vector<string>> result;
        vector<string> path;

        function<void(Trie*)> collect = [&](Trie* node) {
            if (freq[node->serial] > 1) return;
            if (!path.empty()) result.push_back(path);

            for (auto& [folder, child] : node->children) {
                path.push_back(folder);
                collect(child);
                path.pop_back();
            }
        };

        collect(root);
        return result;
    }
};