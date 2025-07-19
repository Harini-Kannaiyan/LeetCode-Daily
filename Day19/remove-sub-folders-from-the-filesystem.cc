// Set + Prefix Check Approach  ::  Time: O(N * L^2)  ::  Space: O(N * L)
class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        unordered_set<string> folderSet(folder.begin(), folder.end());
        vector<string> rootFolders;

        for (string& f : folderSet) {
            string prefix = f;
            bool isSubFolder = false;

            while (!prefix.empty()) {
                size_t pos = prefix.rfind('/');
                if (pos == string::npos) break;

                prefix = prefix.substr(0, pos);
                if (folderSet.count(prefix)) {
                    isSubFolder = true;
                    break;
                }
            }

            if (!isSubFolder) rootFolders.push_back(f);
        }

        return rootFolders;
    }
};



// Sort + Linear Check Approach :: Time: O(N * L) Log(N) + O(N * L)   ::   Space: O(N * L)
class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        sort(folder.begin(), folder.end());
        vector<string> rootFolders{folder[0]};

        for (int i = 1; i < folder.size(); ++i) {
            string last = rootFolders.back() + "/";
            if (folder[i].substr(0, last.size()) != last)
                rootFolders.push_back(folder[i]);
        }

        return rootFolders;
    }
};




// Trie-Based Approach :: Time: O(N * L)  :: Space: O(N * L)
class Solution {
    struct TrieNode {
        bool isEnd = false;
        unordered_map<string, TrieNode*> children;
    };
    
    TrieNode* root = new TrieNode();

public:
    vector<string> removeSubfolders(vector<string>& folder) {
        for (const string& path : folder) {
            TrieNode* node = root;
            istringstream ss(path);
            string token;

            while (getline(ss, token, '/')) {
                if (token.empty()) continue;
                if (!node->children.count(token))
                    node->children[token] = new TrieNode();
                node = node->children[token];
            }

            node->isEnd = true;
        }

        vector<string> res;
        for (const string& path : folder) {
            TrieNode* node = root;
            istringstream ss(path);
            string token;
            bool isSubFolder = false;
            int level = 0;

            while (getline(ss, token, '/')) {
                if (token.empty()) continue;
                node = node->children[token];
                if (node->isEnd && ++level < count(path.begin(), path.end(), '/'))
                    isSubFolder = true;
            }

            if (!isSubFolder) res.push_back(path);
        }

        return res;
    }
};
