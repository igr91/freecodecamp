function convertToRoman(num) {
  //we need to go from biggest to smallest chunks

  let romanNumerals = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let romanConstruct = [];
  let decimal = num;

  for (let i = 0; i < romanNumerals.length; i++) {
    while (romanNumerals[i][0] <= decimal) {
      decimal -= romanNumerals[i][0];
      romanConstruct.push(romanNumerals[i][1]);
    }
  }

  return romanConstruct.join("");
}

convertToRoman(3999);
