class Trie:
    #serial: str = ''
    #children: dict

    def __init__(self):
        self.serial = ''
        self.children = dict()

class Solution:
    def deleteDuplicateFolder(self, paths: List[List[str]]) -> List[List[str]]:
        root = Trie()

        for path in paths:#(n*size(x))
            currNode = root
            for node in path:
                if node not in currNode.children:
                    currNode.children[node] = Trie()
                currNode = currNode.children[node]
        
        freq = Counter()

        def construct(node: Trie) -> None: #(n*size(x) => x is each folder length)
            if not node.children:
                return
            
            v = []

            for folder, child in node.children.items():
                construct(child)
                v.append(folder+'(' + child.serial + ')')
            
            v.sort()
            node.serial = "".join(v)
            freq[node.serial]+=1
        
        construct(root)

        nonDuplicateFolders= []
        path = []

        def operate(node: Trie) -> None: #(n*size(x) => x is each folder length)
            if freq[node.serial] > 1:
                return
            if path:
                nonDuplicateFolders.append(path[:])
            
            for folder, child in node.children.items():
                path.append(folder)
                operate(child)
                path.pop()

        operate(root)
        return nonDuplicateFolders

        