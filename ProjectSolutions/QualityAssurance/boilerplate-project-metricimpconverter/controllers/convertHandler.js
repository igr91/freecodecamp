function ConvertHandler() {
  this.getNum = function(input) {

    const numberRegex = /[0-9./]/g;
    let numberInput;
    let parsedInput;

    if (input == null) {
      return 1;
    } else {
      numberInput = input.trim().match(numberRegex);
    }

    if (numberInput == null) {
      return 1;
    }

    if (Number.isNaN(Number.parseFloat(numberInput))) {
      return 'invalid number';
    }

    if (numberInput.filter((x) => x === "/").length === 2) {
      return 'invalid number';
    }

    if (numberInput.includes("/")) {
      const fraction = numberInput.join("").split("/");
      return Number.parseFloat(fraction[0]) / Number.parseFloat(fraction[1]);
    }

    return Number.parseFloat(input);
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-z]/gi;
    const validUnits = ["kg", "l", "km", "mi", "gal", "lbs"];
    let unit = input.trim().toLowerCase().match(unitRegex).join("");

    if (validUnits.includes(unit)) {
      if (unit === 'l') {
        return 'L';
      }
      return unit;
    }

    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const units = [
      { input: "kg", output: "lbs" },
      { input: "lbs", output: "kg" },
      { input: "L", output: "gal" },
      { input: "gal", output: "L" },
      { input: "km", output: "mi" },
      { input: "mi", output: "km" },
    ];

    let returnUnit;
    units.forEach((item) => {
      if (item.input === initUnit.toString()) {
        returnUnit = item.output;
      }
    });

    return returnUnit;
  };

  this.spellOutUnit = function(unit) {
    const units = [
      { unit: "kg", full: "kilograms" },
      { unit: "lbs", full: "pounds" },
      { unit: "L", full: "liters" },
      { unit: "gal", full: "gallons" },
      { unit: "km", full: "kilometers" },
      { unit: "mi", full: "miles" },
    ];

    let fullUnit;
    units.forEach((item) => {
      if (item.unit === unit.toString()) {
        fullUnit = item.full;
      }
    });

    return fullUnit;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        break;
    }

    return result.toFixed(5);
  };

  this.getString = function(initNum, returnNum, soiUnit, sooUnit) {
    return `${initNum} ${soiUnit} converts to ${returnNum} ${sooUnit}`
  };

}

module.exports = ConvertHandler;
