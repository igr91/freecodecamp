'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

    let solver = new SudokuSolver();

    app.route('/api/check')
        .post((req, res) => {
            const { puzzle, coordinate, value } = req.body;

            if (!puzzle || !coordinate || !value) {
                return res.json({ error: 'Required field(s) missing' });
            }

            const puzzleValidation = solver.validatePuzzle(puzzle);
            const coordinateValidation = solver.validateCoordinate(coordinate);
            const valueValidation = solver.validateValue(value);

            if (puzzleValidation !== true) {
                return res.json(puzzleValidation);
            }

            if (coordinateValidation !== true) {
                return res.json(coordinateValidation);
            }

            if (valueValidation !== true) {
                return res.json(valueValidation);
            }

            //--------------------------------------

            let response = {}

            const validateRow = solver.checkRowPlacement(puzzle, coordinate.split('')[0], coordinate.split('')[1], value);
            const validateColumn = solver.checkColPlacement(puzzle, coordinate.split('')[0], coordinate.split('')[1], value);
            const validateRegion = solver.checkRegionPlacement(puzzle, coordinate.split('')[0], coordinate.split('')[1], value);

            if (validateRow && validateColumn && validateRegion) {
                response.valid = true;
            } else {
                response.valid = false;
                response.conflict = [];
            }

            if (validateRow === false) {
                response.conflict.push("row");
            }

            if (validateColumn === false) {
                response.conflict.push("column");
            }

            if (validateRegion === false) {
                response.conflict.push("region");
            }

            return res.json(response);
        });

    app.route('/api/solve')
        .post((req, res) => {
            const puzzle = req.body.puzzle;

            if (!puzzle) {
                return res.json({ error: 'Required field missing' });
            }

            const validation = solver.validatePuzzle(puzzle);

            if (validation !== true) {
                return res.send(validation);
            }

            const puzzleArray = solver.stringToGrid(puzzle);

            if (solver.solve(puzzleArray, 0, 0)) {
                return res.json({
                    'solution': solver.gridToString(puzzleArray)
                });
            } else {
                return res.json({ error: 'Puzzle cannot be solved' });
            }

        });
};
