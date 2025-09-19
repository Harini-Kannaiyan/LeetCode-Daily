import re
class Spreadsheet:
    # TC: 0(1) , SC: O(m*26)
    def __init__(self, rows: int):
        self.cellMap = {}
        rowsArray = [str(i) for i in range(1, rows+1)]
        for i in rowsArray:
            for j in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
                self.cellMap[j+i] = 0
        
    def extractTokens(self, formula: str):
        '''
        [A-Z]+\d+ → matches cell reference (column letters + row number).
        \d+ → matches numbers.
        '''
        # Match either a cell reference (letters+digits) OR just numbers
        return re.findall(r'[A-Z]+\d+|\d+', formula)

    def setCell(self, cell: str, value: int) -> None:
        self.cellMap[cell] = value
        

    def resetCell(self, cell: str) -> None:
        self.cellMap[cell] = 0
        

    def getValue(self, formula: str) -> int:
        formulaArr = self.extractTokens(formula)
        firstNum = self.cellMap[formulaArr[0]] if formulaArr[0] in self.cellMap else int(formulaArr[0])
        secondNum = self.cellMap[formulaArr[1]] if formulaArr[1] in self.cellMap else int(formulaArr[1])

        return firstNum+secondNum



class Spreadsheet:

    def __init__(self, rows: int):
        self.cellMap = defaultdict(int)

    def extractTokens(self, formula: str):
        '''
        [A-Z]+\d+ → matches cell reference (column letters + row number).
        \d+ → matches numbers.
        '''
        return re.findall(r'[A-Z]+\d+|\d+', formula)

    def setCell(self, cell: str, value: int) -> None:
        self.cellMap[cell] = value

    def resetCell(self, cell: str) -> None:
        if self.cellMap[cell]:
            del self.cellMap[cell]

    def getValue(self, formula: str) -> int:
        formulaArr = self.extractTokens(formula)
        def resolve(token: str) -> int:
            if token.isdigit():
                return int(token)
            return self.cellMap[token]
        firstNum = resolve(formulaArr[0])
        secondNum = resolve(formulaArr[1])
        return firstNum + secondNum



# Your Spreadsheet object will be instantiated and called as such:
# obj = Spreadsheet(rows)
# obj.setCell(cell,value)
# obj.resetCell(cell)
# param_3 = obj.getValue(formula)