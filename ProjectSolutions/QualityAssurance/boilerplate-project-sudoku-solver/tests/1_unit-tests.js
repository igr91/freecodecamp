const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const puzzleSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
        const puzzleGrid = solver.stringToGrid(puzzleString);
        const puzzleSolved = solver.solve(puzzleGrid, 0, 0);
        const puzzleSolvedString = solver.gridToString(puzzleGrid);
        assert.equal(puzzleSolvedString, puzzleSolution);
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1.x..8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = { error: 'Invalid characters in puzzle' };
        assert.deepEqual(solver.validatePuzzle(puzzleString), expectedResult);
    });

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
        const expectedResult = { error: 'Expected puzzle to be 81 characters long' };
        assert.deepEqual(solver.validatePuzzle(puzzleString), expectedResult);
    });

    test('Logic handles a valid row placement', () => {
        const row = "A";
        const column = "2";
        const value = "3";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = true;
        assert.deepEqual(solver.checkRowPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Logic handles an invalid row placement', () => {
        const row = "A";
        const column = "2";
        const value = "5";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = false;
        assert.deepEqual(solver.checkRowPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Logic handles a valid column placement', () => {
        const row = "A";
        const column = "2";
        const value = "4";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = true;
        assert.deepEqual(solver.checkColPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Logic handles an invalid column placement', () => {
        const row = "A";
        const column = "2";
        const value = "6";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = false;
        assert.deepEqual(solver.checkColPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Logic handles a valid region placement', () => {
        const row = "A";
        const column = "2";
        const value = "4";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = true;
        assert.deepEqual(solver.checkRegionPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Logic handles an invalid region placement', () => {
        const row = "A";
        const column = "2";
        const value = "6";
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const expectedResult = false;
        assert.deepEqual(solver.checkRegionPlacement(puzzleString, row, column, value), expectedResult);
    });

    test('Valid puzzle strings pass the solver', () => {
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const puzzleGrid = solver.stringToGrid(puzzleString);
        const expectedResult = true;
        assert.equal(solver.solve(puzzleGrid, 0, 0), expectedResult);
    });

    test('Invalid puzzle strings fail the solver', () => {
        const puzzleString = '3.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const puzzleGrid = solver.stringToGrid(puzzleString);
        const expectedResult = false;
        assert.equal(solver.solve(puzzleGrid, 0, 0), expectedResult);
    });

    test('Solver returns the expected solution for an incomplete puzzle', () => {
        const puzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
        const puzzleSolution = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
        const puzzleGrid = solver.stringToGrid(puzzleString);
        const puzzleSolved = solver.solve(puzzleGrid, 0, 0);
        const puzzleSolvedString = solver.gridToString(puzzleGrid);
        assert.equal(puzzleSolvedString, puzzleSolution);
    });

});
