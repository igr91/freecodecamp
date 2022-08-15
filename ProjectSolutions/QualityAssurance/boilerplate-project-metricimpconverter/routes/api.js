'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      return res.send('invalid number and unit');
    }

    if (initNum == 'invalid number') {
      return res.send('invalid number');
    }

    if (initUnit == 'invalid unit') {
      return res.send('invalid unit');
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const soInputUnit = convertHandler.spellOutUnit(initUnit);
    const soOutputUnit = convertHandler.spellOutUnit(returnUnit);
    const string = convertHandler.getString(initNum, returnNum, soInputUnit, soOutputUnit);

    const response = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: Number.parseFloat(returnNum),
      returnUnit: returnUnit,
      string: string
    }

    res.status(200).type('json').send(response);
  });

};
