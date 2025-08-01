// Set + Prefix Check Approach  ::  Time: O(N * L^2)  ::  Space: O(N * L)
var removeSubfolders = function(folder) {
    let folderSet = new Set(folder);
    let rootFolders = [];

    for (let f of folderSet) {
        let prefix = f;
        let isSubFolder = false;

        while (prefix.length > 0) {
            let pos = prefix.lastIndexOf("/");
            if (pos === -1) break;

            prefix = prefix.slice(0, pos);
            if (folderSet.has(prefix)) {
                isSubFolder = true;
                break;
            }
        }

        if (!isSubFolder) rootFolders.push(f);
    }

    return rootFolders;
};



// Sort + Linear Check Approach :: Time: O(N * L) Log(N) + O(N * L)   ::   Space: O(N * L)
var removeSubfolders = function(folder) {
    folder.sort();
    let rootFolders = [folder[0]];

    for (let i = 1; i < folder.length; i++) {
        let last = rootFolders[rootFolders.length - 1] + "/";
        if (!folder[i].startsWith(last)) {
            rootFolders.push(folder[i]);
        }
    }

    return rootFolders;
};




// Trie-Based Approach :: Time: O(N * L)  :: Space: O(N * L)
var removeSubfolders = function(folder) {
    class TrieNode {
        constructor() {
            this.isEnd = false;
            this.children = {};
        }
    }

    const root = new TrieNode();

    for (let path of folder) {
        let node = root;
        for (let part of path.split("/")) {
            if (part === "") continue;
            if (!node.children[part]) {
                node.children[part] = new TrieNode();
            }
            node = node.children[part];
        }
        node.isEnd = true;
    }

    const result = [];

    for (let path of folder) {
        let node = root;
        let isSubFolder = false;
        let parts = path.split("/");

        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === "") continue;
            node = node.children[parts[i]];
            if (node.isEnd && i !== parts.length - 1) {
                isSubFolder = true;
                break;
            }
        }

        if (!isSubFolder) result.push(path);
    }

    return result;
};
