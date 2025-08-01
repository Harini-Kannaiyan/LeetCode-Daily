class Trie {
    constructor() {
        this.serial = "";
        this.children = {};
    }
}

var deleteDuplicateFolder = function(paths) {
    const root = new Trie();

    for (let path of paths) {
        let node = root;
        for (let folder of path) {
            if (!node.children[folder]) {
                node.children[folder] = new Trie();
            }
            node = node.children[folder];
        }
    }

    const freq = new Map();

    function construct(node) {
        if (Object.keys(node.children).length === 0) return;

        const v = [];
        for (let [folder, child] of Object.entries(node.children)) {
            construct(child);
            v.push(folder + '(' + child.serial + ')');
        }
        v.sort();
        node.serial = v.join('');
        freq.set(node.serial, (freq.get(node.serial) || 0) + 1);
    }

    construct(root);

    const result = [];
    const path = [];

    function dfs(node) {
        if (freq.get(node.serial) > 1) return;
        if (path.length > 0) result.push([...path]);

        for (let [folder, child] of Object.entries(node.children)) {
            path.push(folder);
            dfs(child);
            path.pop();
        }
    }

    dfs(root);
    return result;
};
