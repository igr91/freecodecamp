const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Should correctly read whole number input', () => {
    assert.equal(convertHandler.getNum("5"), 5);
  });

  test('Should correctly read a decimal number input', () => {
    assert.equal(convertHandler.getNum("5.5"), 5.5);
  });

  test('Should correctly read a fractional input', () => {
    assert.equal(convertHandler.getNum("5 / 4"), 5 / 4);
  });

  test('Should correctly read a fractional input with decimal', () => {
    assert.equal(convertHandler.getNum("10 / 2.5"), 4);
  });

  test('Should correctly return an error on a double-fraction', () => {
    assert.deepEqual(convertHandler.getNum("8/9/10"), 'invalid number');
  });

  test('Should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(convertHandler.getNum(), 1);
  });

  test('Should correctly read each valid input unit', () => {
    assert.equal(convertHandler.getUnit("10kg"), "kg");
    assert.equal(convertHandler.getUnit("10L"), "L");
    assert.equal(convertHandler.getUnit("10km"), "km");
    assert.equal(convertHandler.getUnit("10mi"), "mi");
    assert.equal(convertHandler.getUnit("10gal"), "gal");
    assert.equal(convertHandler.getUnit("10lbs"), "lbs");
  });

  test('Should correctly return an error for an invalid input unit', () => {
    assert.deepEqual(convertHandler.getUnit("10kgf"), 'invalid unit');
    assert.deepEqual(convertHandler.getUnit("429k"), 'invalid unit');
    assert.deepEqual(convertHandler.getUnit("52cd"), 'invalid unit');
  });

  test('Should return the correct return unit for each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
  });

  test('should correctly return the spelled-out string unit for each valid input unit', () => {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
  });

  test('Should correctly convert gal to L', () => {
    const galToL = 3.78541;
    assert.equal(convertHandler.convert(1, 'gal'), (1 * galToL).toFixed(5));
  });

  test('Should correctly convert L to gal', () => {
    const galToL = 3.78541;
    assert.equal(convertHandler.convert(1, 'L'), (1 / galToL).toFixed(5));
  });

  test('Should correctly convert mi to km', () => {
    const miToKm = 1.60934;
    assert.equal(convertHandler.convert(1, 'mi'), (1 * miToKm).toFixed(5));
  });

  test('Should correctly convert km to mi', () => {
    const miToKm = 1.60934;
    assert.equal(convertHandler.convert(1, 'km'), (1 / miToKm).toFixed(5));
  });

  test('Should correctly convert lbs to kg', () => {
    const lbsToKg = 0.453592;
    assert.equal(convertHandler.convert(1, 'lbs'), (1 * lbsToKg).toFixed(5));
  });

  test('Should correctly convert kg to lbs', () => {
    const lbsToKg = 0.453592;
    assert.equal(convertHandler.convert(1, 'kg'), (1 / lbsToKg).toFixed(5));
  });
});