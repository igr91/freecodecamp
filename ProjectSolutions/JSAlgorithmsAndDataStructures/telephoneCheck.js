function telephoneCheck(str) {
  if (str.match(/^(1\s?)?(\(\d{3}\)|\d{3})([-\s])?(\d{3})([-\s])?(\d{4})$/g)) {
    return true;
  } else {
    return false;
  }
}

telephoneCheck("sf3555-555-5555");
telephoneCheck("555-555-5555");
telephoneCheck("1 555 555 5555");
