class SudokuSolver {

    getRow(inputLetter) {
        const letterLookUpTable = [["A", 0], ["B", 1], ["C", 2], ["D", 3], ["E", 4], ["F", 5], ["G", 6], ["H", 7], ["I", 8]];
        let letter;

        letterLookUpTable.forEach(item => {
            if (item[0] == inputLetter) {
                letter = item[1];
            }
        });

        return letter;
    }

    getColumn(inputColumn) {
        return inputColumn - 1;
    }

    checkRowPlacement(puzzleString, row, column, value) {
        const actualColumn = this.getColumn(column);
        const actualRow = this.getRow(row);
        const puzzleGrid = this.stringToGrid(puzzleString);

        let rowToCheck = puzzleGrid[actualRow];

        if (rowToCheck[actualColumn] == value) {
            return true;
        }

        if (rowToCheck[actualColumn] != 0) {
            return false;
        }

        if (rowToCheck.includes(parseInt(value))) {
            return false;
        }

        return true;
    }

    checkColPlacement(puzzleString, row, column, value) {
        const actualColumn = this.getColumn(column);
        const actualRow = this.getRow(row);
        const puzzleGrid = this.stringToGrid(puzzleString);
        let columnToCheck = [];

        puzzleGrid.forEach(gridRow => {
            columnToCheck.push(gridRow[actualColumn]);
        })

        if (columnToCheck[actualRow] == value) {
            return true;
        }

        if (columnToCheck[actualRow] != 0) {
            return false;
        }

        if (columnToCheck.includes(parseInt(value))) {
            return false;
        }

        return true;
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        const actualColumn = this.getColumn(column);
        const actualRow = this.getRow(row);
        const puzzleGrid = this.stringToGrid(puzzleString);

        // not picking a particular entire row or column to check here,
        // so directly access the intended value
        if (puzzleGrid[actualRow][actualColumn] == value) {
            return true;
        }

        // check/logic taken from GeeksForGeeks' isSafe()
        let startRow = actualRow - (actualRow % 3);
        let startCol = actualColumn - (actualColumn % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (puzzleGrid[i + startRow][j + startCol] == value) {
                    return false;
                }
            }
        }

        return true;
    }

    validatePuzzle(puzzle) {
        const charRegex = /[^0-9.]/g;
        if (puzzle.length != 81) {
            return { error: 'Expected puzzle to be 81 characters long' };
        }
        if (puzzle.match(charRegex)) {
            return { error: 'Invalid characters in puzzle' };
        }
        return true;
    }

    validateCoordinate(coordinate) {
        const coordArray = coordinate.split('');
        const letterRegex = /[^A-I]{1}/g;
        const numberRegex = /[^1-9]{1}/g;
        if (coordinate.length != 2 || coordArray[0].match(letterRegex) || coordArray[1].match(numberRegex)) {
            return { error: 'Invalid coordinate' };
        }
        return true;
    }

    validateValue(value) {
        const numberRegex = /[^1-9]{1}/g;
        if (value.length != 1 || value.match(numberRegex)) {
            return { error: 'Invalid value' };
        }
        return true;
    }


    // sudoku backtracking/bruteforce algorithm
    // source: www.geeksforgeeks.org/sudoku-backtracking-7
    solve(grid, row, col) {
        if (row === 9 - 1 && col === 9) {
            return true;
        }

        if (col === 9) {
            row++;
            col = 0;
        }

        if (grid[row][col] !== 0) {
            return this.solve(grid, row, col + 1);
        }

        for (let num = 1; num < 10; num++) {
            if (this.isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                if (this.solve(grid, row, col + 1)) {
                    return true;
                }
            }
            grid[row][col] = 0;
        }
        return false;
    }

    isSafe(grid, row, col, num) {
        for (let x = 0; x <= 8; x++) {
            if (grid[row][x] === num) {
                return false;
            }
        }

        for (let x = 0; x <= 8; x++) {
            if (grid[x][col] === num) {
                return false;
            }
        }

        let startRow = row - row % 3;
        let startCol = col - col % 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    stringToGrid(puzzleString) {
        const puzzleCharArray = puzzleString.split('');
        let puzzleArray = [];
        let puzzleRow = [];

        for (let i = 0; i < puzzleCharArray.length; i++) {
            if (puzzleCharArray[i] == ".") {
                puzzleRow.push(0);
            } else {
                puzzleRow.push(parseInt(puzzleCharArray[i]));
            }

            if (((i + 1) % 9) === 0) {
                puzzleArray.push(puzzleRow);
                puzzleRow = [];
            }
        }

        return puzzleArray;
    }

    gridToString(puzzleArray) {
        const grid = puzzleArray;
        let string = "";

        grid.forEach(array => {
            array.forEach(item => {
                string += item;
            });
        });

        return string; //there's also array.flat()...
    }

}

module.exports = SudokuSolver;

