class Spreadsheet {
    constructor(rows, prepopulate) {
        this.cellMap = {};
        if (prepopulate) {
            for (let i = 1; i <= rows; i++) {
                for (let c = 65; c <= 90; c++) { // 'A'..'Z'
                    const cell = String.fromCharCode(c) + i;
                    this.cellMap[cell] = 0;
                }
            }
        }
    }

    extractTokens(formula) {
        return formula.match(/[A-Z]+\d+|\d+/g) || [];
    }

    setCell(cell, value) {
        this.cellMap[cell] = value;
    }

    resetCell(cell) {
        if (this.cellMap.hasOwnProperty(cell)) {
            this.cellMap[cell] = 0;
        }
    }

    getValue(formula) {
        const tokens = this.extractTokens(formula);
        const resolve = (token) => {
            if (/^\d+$/.test(token)) return parseInt(token, 10);
            return this.cellMap[token] || 0;
        };
        return resolve(tokens[0]) + resolve(tokens[1]);
    }
}
