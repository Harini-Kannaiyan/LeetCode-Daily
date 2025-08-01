class Solution:
    #TC - o(N.L^2), SC = O(N.L)
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        folderSet = set(folder)
        rootFolders = []
        
        for folder in folderSet:
            isSubFolder = False
            prefix = folder

            while prefix != "":
                pos = prefix.rfind("/")

                if pos == -1:
                    break

                # Reduce the prefix to its parent folder
                prefix = prefix[0:pos]

                # If the parent folder exists in the set, mark as sub-folder
                if prefix in folderSet:
                    isSubFolder = True
                    break
            
            if not isSubFolder :
                rootFolders.append(folder)
        
        return rootFolders


class Solution:
    #TC - N*l logN + O(N*L ) SC = O(N.L)
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        folder.sort()

        rootFolders = [folder[0]]

        for i in range(1, len(folder)):
            lastFolder = rootFolders[-1]
            lastFolder+='/'

            if not folder[i].startswith(lastFolder):
                rootFolders.append(folder[i])
        
        return rootFolders



# Trie-Based Approach :: Time: O(N * L)  :: Space: O(N * L)
class Solution:
    class TrieNode:
        def __init__(self):
            self.isEndOfFolder = False
            self.children = {}
        
    def __init__(self):
        self.root = self.TrieNode()

    def removeSubfolders(self, folder: List[str]) -> List[str]:
        for path in folder:
            currentNode = self.root
            folders = path.split("/")

            for folderName in folders:
                if folderName == "":
                    continue

                if folderName not in currentNode.children:
                    currentNode.children[folderName] = self.TrieNode()
                currentNode = currentNode.children[folderName]
            
            currentNode.isEndOfFolder = True

        rootFolders = []
        for path in folder:
            currentNode = self.root
            folders = path.split("/")
            isSubFolder = False

            for i, folderName in enumerate(folders):
                if folderName == "":
                    continue
                
                nextNode = currentNode.children[folderName]

                if nextNode.isEndOfFolder and i != len(folders) -1:
                    isSubFolder = True
                
                currentNode = nextNode
            
            if not isSubFolder :
                rootFolders.append(path)
        return rootFolders